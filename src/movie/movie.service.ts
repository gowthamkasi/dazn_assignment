import Movie from './movie.model';

export class MovieService {
  async listMovies() {
    return await Movie.find();
  }

  async searchMovies(query: string) {
    return await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
      ],
    });
  }

  async addMovie(movieData: {
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
  }) {
    const movie = new Movie(movieData);
    return await movie.save();
  }

  async updateMovie(
    id: string,
    movieData: Partial<{
      title: string;
      genre: string;
      rating: number;
      streamingLink: string;
    }>
  ) {
    return await Movie.findByIdAndUpdate(id, movieData, { new: true });
  }

  async deleteMovie(id: string) {
    return await Movie.findByIdAndDelete(id);
  }

  async getMovieById(id: string) {
    return await Movie.findById(id);
  }
}
