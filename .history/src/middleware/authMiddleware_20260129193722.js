import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const authMiddleware = async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
        const token = req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ error: "No token provided, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found, authorization denied" });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        res.status(401).json({ error: "Token is not valid" });
    } finally {
        await prisma.$disconnect();
    }
};