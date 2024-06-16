import mongoose from "mongoose";

const MoviesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    watchedUnwatched: {
      type: Boolean,
      default: false,
    },
    description: String,
    imgUrl: String, // Path to the picture file which is uploaded in cloudinary
    videoUrl: String, // Path to the video file
  },
  { timestamps: true }
);

const Movies = mongoose.model("Movies", MoviesSchema);
export default Movies;
