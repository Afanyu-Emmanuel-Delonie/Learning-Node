import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { request } from "express";

const authMiddleware = async (req, res, next) => {
    // we want to read the token from the request
    // check if the token is in the Authorization header

    let token;

    if(req.headers.authorization && )
};

export default authMiddleware;