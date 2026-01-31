import z from "zod";

const addToWatchListSchema = z.object({
    movieId: z.string().uuid({ message: "Invalid movieId format" }),
    status: z.enum([
        TO_WATCH,
        WATCHING,
        WATCHED
    ], { error: () => ({ message: "Invalid status value" }) }).optional(),
    rating: z.coerce.number().int("Rating must be an integer").min(1, "Rating must be at least 1").max(10, "Rating cannot exceed 10").optional(),
    review: z.string().max(500, "Review cannot exceed 500 characters").optional(),
});

export { addToWatchListSchema };