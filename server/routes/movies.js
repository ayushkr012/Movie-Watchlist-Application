import express from "express";
import {
  getFeedMovies,
  deleteMovie,
  createMovie,
  updateMovie,
  watchedUnwatched,
  addReview,
  getMoviesDetails,
} from "../controllers/movies.js";
import { verifyToken } from "../middleware/auth.js";
const moviesRoutes = express.Router();

/*Create Movie */
moviesRoutes.post("/createPost", verifyToken, createMovie);

/* get feedMovies of you watchlist */
moviesRoutes.get("/:userId", verifyToken, getFeedMovies);

/* Update Movie */
moviesRoutes.put("/:postId/editPost", verifyToken, updateMovie);

/*DELETE  Movie */
moviesRoutes.delete("/:PostId", verifyToken, deleteMovie);

/* Add Review */
moviesRoutes.put("/:postId/addReview", verifyToken, addReview);

/*Get Movie  Details */
moviesRoutes.get("/:postId/getMovieDetails", verifyToken, getMoviesDetails);
export default moviesRoutes;

/* watch unwathed toggle */
moviesRoutes.patch("/:postId/watchedUnwatched", verifyToken, watchedUnwatched);
