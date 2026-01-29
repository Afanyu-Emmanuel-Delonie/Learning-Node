
const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes, userId} = req.body;

    // verify that movie exist 
    const movie = await prisma.Movie.findUnique({
        where: { id: movieId },
    });

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    // check if already added movie to watchlist
    const existing = await prisma.WatchList.findFirst({
        where: {
            userId: req.user.id,
            movieId: movieId,
        },
    });

    if (existing) {
        return res.status(400).json({ error: "Movie already in watchlist" });
    }

    // add movie to watchlist
    const watchlistItem = await prisma.WatchListItem.create({
        data: {
            userId: req.user.id,
            movieId: movieId,
            status: status || "PLANNED",
            rating: rating,
            notes: notes,
        },
    });

    res.status(201).json({ message: "Movie added to watchlist", watchlistItem });
};

export