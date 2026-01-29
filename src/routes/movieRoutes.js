import express from 'express';

const router = express.Router();

router.get('/movie', (req, res) => {
  res.json({ movies: ['Inception', 'The Matrix', 'Interstellar'] });
});

export default router; 