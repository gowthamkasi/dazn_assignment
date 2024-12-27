import request from 'supertest';
import express from 'express';
import { afterAll, beforeAll, expect } from '@jest/globals';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/db';
import movieRoutes from '../src/movie/movie.routes';

const app = express();

beforeAll(async () => {
  app.use(express.json());
  app.use('/api/v1/movie-lobby', movieRoutes);

  await connectDB();
  await new Promise<void>((resolve) => {
    app.listen(3000, () => {
      resolve();
      console.log('Server is running at 3000');
    });
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Movie Routes Integration Tests', () => {
  let movieId: string | null = null;

  describe('POST /movies', () => {
    it('should create a new movie', async () => {
      const newMovie = {
        title: 'Test Movie',
        rating: 4,
        genre: 'Action',
        streamingLink: 'https://www.youtube.com/',
      };

      const response = await request(app)
        .post('/api/v1/movie-lobby/movies')
        .set('role', 'admin')
        .send(newMovie);

      console.log('response.body:', JSON.stringify(response.body));

      movieId = response.body.data.movie._id;

      expect(response.status).toBe(201);
    });

    it('should return 400 for invalid movie data', async () => {
      const invalidMovie = {
        title: '', // empty title
        description: 'Test Description',
      };

      const response = await request(app)
        .post('/api/v1/movie-lobby/movies')
        .send(invalidMovie);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /movies/:id', () => {
    it('should update an existing movie', async () => {
      const updateData = {
        title: 'Updated Movie Title',
      };

      const response = await request(app)
        .put(`/api/v1/movie-lobby/movies/${movieId}`)
        .set('role', 'admin')
        .send(updateData);

      expect(response.status).toBe(200);
    });
  });

  describe('GET /movies', () => {
    it('should return all movies', async () => {
      const response = await request(app).get('/api/v1/movie-lobby/movies');
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /movies/:id', () => {
    it('should delete an existing movie', async () => {
      const response = await request(app)
        .delete(`/api/v1/movie-lobby/movies/${movieId}`)
        .set('role', 'admin');

      expect(response.status).toBe(200);
    });
  });
});
