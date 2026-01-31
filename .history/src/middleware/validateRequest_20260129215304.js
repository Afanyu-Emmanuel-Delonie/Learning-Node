export const validateRequest = (schema) => {
    return (req, res, next) => {
        // Add check to ensure schema exists
        if (!schema || typeof schema.safeParse !== 'function') {
            console.error('Invalid schema provided to validateRequest');
            return res.status(500).json({ 
                error: "Server configuration error" 
            });
        }

        const result = schema.safeParse(req.body);
        
        if (!result.success) {
            // Simple and clean error formatting
            const errorMessages = result.error.errors.map((err) => ({
                field: err.path.join('.') || 'body',
                message: err.message
            }));
            
            console.log("Validation errors:", errorMessages);
            return res.status(400).json({ 
                error: "Validation failed",
                details: errorMessages
            });
        }
        
        next();
    };
};