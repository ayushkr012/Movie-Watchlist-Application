import express from "express";
import {
  getFeedMovies,
  deleteMovie,
  createMovie,
  updateMovie,
  watchedUnwatched,
  addReview,
} from "../controllers/movies.js";
import { verifyToken } from "../middleware/auth.js";
const moviesRoutes = express.Router();

/*Create Movie */
moviesRoutes.post("/createPost", verifyToken, createMovie);

/* get feedMovies of you watchlist */
moviesRoutes.get("/:userId", verifyToken, getFeedMovies);

/* Update  the watch and unwathched movies */
moviesRoutes.patch("/:id/like", verifyToken, watchedUnwatched);

/* Update Movie */
moviesRoutes.put("/:postId/editPost", verifyToken, updateMovie);

/*DELETE  Movie */
moviesRoutes.delete("/:PostId", verifyToken, deleteMovie);

/* Add Review */
moviesRoutes.put("/:postId/addReview", verifyToken, addReview);
export default moviesRoutes;
