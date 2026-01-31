import z from "zod";

const addToWatchListSchema = z.object({
    movieId: z.string().uuid({ message: "Invalid movieId format" }),
    status: z.enum([
        TO_WATCH,
        WATCHING,
        WATCHED
    ], { error: () => ({ message: "Invalid status value" }) }).optional(),
    rating: z.coerce.number().int()
});