import { Router } from 'express';
import MovieController from './movie.controller';

const router = Router();
const movieController = new MovieController();

const { listMovies, searchMovies, addMovie, updateMovie, deleteMovie } =
  movieController;

router.get('/movies', listMovies);
router.get('/search', searchMovies);
router.post('/movies', addMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

export default router;
