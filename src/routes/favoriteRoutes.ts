import { Router } from "express";
import { getFavorites, addFavorite, deleteFavorite } from "../controllers/favoriteController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Tüm favori route'ları token ister
router.use(authMiddleware);

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/:id", deleteFavorite);

export default router;