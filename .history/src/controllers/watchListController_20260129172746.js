import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addToWatchList = async (req, res) => {
    console.log("=== WATCHLIST REQUEST DEBUG ===");
    console.log("req.body:", req.body);
    console.log("req.body type:", typeof req.body);
    console.log("Content-Type header:", req.headers['content-type']);
    console.log("All headers:", req.headers);
    console.log("================================");

    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ 
                error: "Invalid request body",
                receivedType: typeof req.body,
                receivedValue: req.body,
                contentType: req.headers['content-type']
            });
        }

        const { movieId, userId, status, rating, notes } = req.body;

        console.log("Extracted values:", { movieId, userId, status, rating, notes });

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
        const existing = await prisma.watchList.findFirst({
            where: {
                userId: userId,
                movieId: movieId,
            },
        });

        if (existing) {
            return res.status(400).json({ error: "Movie already in watchlist" });
        }

        // Add movie to watchlist
        const watchlistItem = await prisma.watchList.create({
            data: {
                userId: userId,
                movieId: movieId,
                status: status || "PLANNED",
                rating: rating,
                notes: notes,
            },
            include: {
                movie: true
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