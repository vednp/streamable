import { Schema, model, models } from "mongoose";

const SavedMovieSchema = new Schema({
  media_type: {
    type: String,
  },
  movieId: {
    type: Number,
  },
  poster_path: {
    type: String,
  },
  title: {
    type: String,
  },
  vote_average: {
    type: Number,
  },
});

const User = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
  savedMovies: {
    type: [SavedMovieSchema], // Array of objects
    default: [], // Default to an empty array
  },
});

export default models.User || model("User", User);
