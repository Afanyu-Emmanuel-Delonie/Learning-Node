import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addToWatchList = async (req, res) => {
    try {
        const { movieId, userId, status, rating, review } = req.body;

        // Verify that required fields are provided
        if (!movieId || !userId) {
            return res.status(400).json({ error: "movieId and userId are required" });
        }

        // Verify that movie exists
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // Verify that user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if already added movie to watchlist
        const existing = await prisma.watchlistItem.findFirst({
            where: {
                userId: userId,
                movieId: movieId,
            },
        });

        if (existing) {
            return res.status(400).json({ error: "Movie already in watchlist" });
        }

        // Add movie to watchlist
        const watchlistItem = await prisma.watchlistItem.create({
            data: {
                userId: userId,
                movieId: movieId,
                status: status || "TO_WATCH", 
                rating: rating,
                review: review, // Changed from 'notes' to 'review'
            },
            include: {
                movie: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(201).json({ 
            message: "Movie added to watchlist", 
            watchlistItem 
        });

    } catch (error) {
        console.error("Error adding to watchlist:", error);
        res.status(500).json({ 
            error: "Failed to add movie to watchlist",
            details: error.message 
        });
    }
};

export { addToWatchList };