import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addToWatchList = async (req, res) => {
    try {
        const { movieId, status, rating, review } = req.body;
        const userId = req.user.id; // Get userId from authenticated user

        // Verify that required fields are provided
        if (!movieId) {
            return res.status(400).json({ error: "movieId is required" });
        }

        // Verify that movie exists
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
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
                review: review,
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

const updateWatchListItem = async (req, res) => {
    // This function can be implemented to update status, rating, or review of a watchlist item
    const { status, rating, review } = req.body;
    const watchlistItemId = req.params.id;
    const userId = req.user.id;

    // Find watchlistItemId and verify ownership 
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: watchlistItemId },
    });

    if (!watchlistItem || watchlistItem.userId !== userId) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }
}

const removeFromWatchList = async (req, res) => {
    try {
        const watchlistItemId = req.params.id;
        const userId = req.user.id; 

        // Verify that watchlist item exists and belongs to the user
        const watchlistItem = await prisma.watchlistItem.findUnique({
            where: { id: watchlistItemId },
        });

        if (!watchlistItem || watchlistItem.userId !== userId) {
            return res.status(404).json({ error: "Watchlist item not found" });
        }

        // Remove movie from watchlist
        await prisma.watchlistItem.delete({
            where: { id: watchlistItemId },
        });

        res.status(200).json({ message: "Movie removed from watchlist" });

    } catch (error) {
        console.error("Error removing from watchlist:", error);
        res.status(500).json({ 
            error: "Failed to remove movie from watchlist", 
            details: error.message 
        });
    }
};

export { addToWatchList, removeFromWatchList };