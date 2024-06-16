import express from "express";
import { getUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const userRoutes = express.Router();

/*READ*/
userRoutes.get("/:id", verifyToken, getUser);

export default userRoutes;
