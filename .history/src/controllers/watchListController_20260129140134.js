import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addToWatchList = async (req, res) => {
    try {
        const { movieId, status, rating, notes } = req.body;

        // Verify that movieId is provided
        if (!movieId) {
            return res.status(400).json({ error: "movieId is required" });
        }

        // Verify that movie exists (note: lowercase 'movie', not 'Movie')
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // Check if already added movie to watchlist (note: lowercase 'watchList')
        const existing = await prisma.watchList.findFirst({
            where: {
                userId: req.user.id,
                movieId: movieId,
            },
        });

        if (existing) {
            return res.status(400).json({ error: "Movie already in watchlist" });
        }

        // Add movie to watchlist (note: lowercase 'watchList', not 'WatchListItem')
        const watchlistItem = await prisma.watchList.create({
            data: {
                userId: req.user.id,
                movieId: movieId,
                status: status || "PLANNED",
                rating: rating,
                notes: notes,
            },
            include: {
                movie: true // Include movie details in response
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