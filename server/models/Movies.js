import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

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
      type: String,
      required: true,
    },
    watchedUnwatched: {
      type: Boolean,
      default: false,
    },
    description: String,
    imgUrl: String, // Path to the picture file which is uploaded in cloudinary
    videoUrl: String, // Path to the video file
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

const Movies = mongoose.model("Movies", MoviesSchema);
export default Movies;
