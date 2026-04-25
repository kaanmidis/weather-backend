import { Request, Response } from "express";
import { pool } from "../lib/db";
import { AuthRequest } from "../middleware/authMiddleware";

export const addFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const { cityName, country } = req.body;

    const result = await pool.query(
      "INSERT INTO \"FavoriteCity\" (\"cityName\", country, \"userId\") VALUES ($1, $2, $3) RETURNING *",
      [cityName, country, req.userId]
    );

    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "This city is already in the favorites." });
    }
    res.status(500).json({
        status: "error",
        message: "Unable to add favorite city"
    });
  }
};

export const getFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM \"FavoriteCity\" WHERE \"userId\" = $1 ORDER BY \"createdAt\" DESC",
      [req.userId]
    );
    res.json({ status: "success", data: result.rows });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Unable to fetch favorite cities" });
  }
};

export const deleteFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM \"FavoriteCity\" WHERE id = $1 AND \"userId\" = $2",
      [id, req.userId]
    );

    res.json({ status: "success", message: "Favorite city deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Unable to delete favorite city" });
  }
};