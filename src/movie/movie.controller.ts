import { Request, Response } from 'express';
import { MovieService } from './movie.service';
import Joi from './movie.validator';
import { errorHandler, responseHandler } from '../helpers/responseHandler';

class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  readonly listMovies = async (_req: Request, res: Response): Promise<void> => {
    try {
      const movies = await this.movieService.listMovies();

      return responseHandler({
        res,
        status: 200,
        msg: 'Movies fetched successfully',
        data: { movies },
      });
    } catch (error) {
      return errorHandler({
        res,
        status: 500,
        err: 'Error fetching movies',
      });
    }
  };

  readonly searchMovies = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const query = req.query.q as string;
    try {
      const movies = await this.movieService.searchMovies(query);

      return responseHandler({
        res,
        status: 200,
        msg: 'Movies fetched successfully',
        data: { movies },
      });
    } catch (error) {
      errorHandler({
        res,
        err: 'Error searching movies',
        status: 500,
      });
    }
  };

  readonly addMovie = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Inside addMovie controller');
      const validator = await Joi(req.body, 'addMovie');

      if (validator.error) {
        return errorHandler({
          res,
          err: validator.message,
          status: 400,
        });
      }

      const role = req.headers.role; // assuming role is taken from jwt token payload

      if (role !== 'admin') {
        return errorHandler({
          res,
          err: 'Unauthorized',
          status: 401,
        });
      }

      const movieData = req.body;

      const newMovie = await this.movieService.addMovie(movieData);
      responseHandler({
        res,
        status: 201,
        msg: 'Movie added successfully',
        data: { movie: newMovie },
      });
    } catch (error) {
      errorHandler({
        res,
        err: 'Error adding movie',
        status: 500,
      });
    }
  };

  readonly updateMovie = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Inside updateMovie controller');
      const validator = await Joi(req.body, 'updateMovie');

      if (validator.error) {
        return errorHandler({
          res,
          err: validator.message,
          status: 400,
        });
      }

      const movieId = req.params.id;

      const movie = await this.movieService.getMovieById(movieId);
      if (!movie)
        return errorHandler({
          res,
          err: 'Movie not found',
          status: 400,
        });

      const role = req.headers.role; // assuming role is taken from jwt token payload

      if (role !== 'admin') {
        return errorHandler({
          res,
          err: 'Unauthorized',
          status: 401,
        });
      }

      const movieData = req.body;

      const updatedMovie = await this.movieService.updateMovie(
        movieId,
        movieData
      );

      return responseHandler({
        res,
        status: 200,
        msg: 'Movie updated successfully',
        data: { movie: updatedMovie },
      });
    } catch (error) {
      return errorHandler({
        res,
        err: 'Error updating movie',
        status: 500,
      });
    }
  };

  readonly deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const movieId = req.params.id;
    try {
      const role = req.headers.role; // assuming role is taken from jwt token payload

      if (role !== 'admin') {
        return errorHandler({
          res,
          err: 'Unauthorized',
          status: 401,
        });
      }

      const movie = await this.movieService.getMovieById(movieId);

      if (!movie)
        return errorHandler({
          res,
          err: 'Movie not found',
          status: 400,
        });

      await this.movieService.deleteMovie(movieId);

      return responseHandler({
        res,
        status: 200,
        msg: 'Movie deleted successfully',
      });
    } catch (error) {
      return errorHandler({
        res,
        err: 'Error deleting movie',
        status: 500,
      });
    }
  };
}

export default MovieController;
