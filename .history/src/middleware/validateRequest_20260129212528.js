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
            // Add safety check for error structure
            if (result.error && result.error.errors) {
                const errorMessages = result.error.errors.map((err) => ({
                    field: err.path.join('.') || 'unknown',
                    message: err.message
                }));
                return res.status(400).json({ 
                    error: "Validation failed",
                    details: errorMessages 
                });
            }
            
            // Fallback for unexpected error structure
            return res.status(400).json({ 
                error: "Validation failed",
                details: result.error?.message || "Invalid request data"
            });
        }
        
        next();
    };
};