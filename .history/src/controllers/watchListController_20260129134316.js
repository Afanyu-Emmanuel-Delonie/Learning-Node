
const addToWatchList = (req, res) => {
    const { movieId, status, rating, notes} = req.body;

    // verify that movie exist 
    cost movie = await prisma.Movie.findUnique({
        where: { id: movieId },
    });

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    // add movie to watchlist
}