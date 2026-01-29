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

    try
};

export default authMiddleware;