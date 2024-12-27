import mongoose, { Document, Schema } from 'mongoose';

export interface MovieI extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  streamingLink: { type: String, required: true },
});

const Movie = mongoose.model<MovieI>('Movie', movieSchema);

export default Movie;
