

export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const error = result.error.errors.map((err) => err.message);
            return res.status(400).json({ errors });
        }
        next();
    }
}