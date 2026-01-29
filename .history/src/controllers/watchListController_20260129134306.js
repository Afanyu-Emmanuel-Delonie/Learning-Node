
const addToWatchList = (req, res) => {
    const { movieId, status, rating, notes} = req.body;

    // verify that movie exist 
    cost movie = await prisma.Movie.findUnique({
}