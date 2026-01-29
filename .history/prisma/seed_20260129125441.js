// this is used to create random data that we will use to test our database 

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const creatorId = "f4a7eb0e-e61f-4620-9283-fef73bc2ad85";

const movies = [
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    poster
]