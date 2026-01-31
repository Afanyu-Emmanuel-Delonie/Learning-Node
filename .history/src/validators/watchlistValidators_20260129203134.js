import z from "zod";

const addToWatchListSchema = z.object({
    movieId: z.string().uuid({ message: "Invalid movieId format" }),
    status:
});