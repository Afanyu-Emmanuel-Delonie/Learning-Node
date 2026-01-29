import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { request } from "express";

const authMiddleware = async (req, res, next) => {
    // we want to read the token from the request
    // check if the token is in the Authorization header

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } 
    // else check if the token is in cookies
    else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token" });
    }

    try{
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const prisma = new PrismaClient();

        // fecth the user from the database
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            return res.status(401).json({ error: "Not authorized, user not found" });
        }

        req.user = user; 
        next();

    }catch(err){
        return res.status(401).json({ error: "Not authorized, invalid token" });
    }
};

export default authMiddleware;