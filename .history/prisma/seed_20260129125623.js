// this is used to create random data that we will use to test our database 

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const creatorId = "f4a7eb0e-e61f-4620-9283-fef73bc2ad85";

const movies = [
    {
        title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    creatorId: creatorId,
},
    {
        title: "The Dark Knight",
    overview: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    creatorId: creatorId,
},
    {
        title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://image.tmdb.org/t/people/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    creatorId: creatorId,
},      
]