import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../lib/db";
import { stat } from "node:fs";
// register

export const register = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        
        // Is there a user?
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "User already exists"
                }
            )
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // Create the user
        const createUser = await pool.query(
            "INSERT INTO users (email,password) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        );
        const newUser = createUser.rows[0];

        // Create a JWT token
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET || "your_jwt_secret",
            { expiresIn: "7d" }
        );

        res.status(201).json(
            {
                status: "success",
                message: "User registered successfully",
                users: {
                    id: newUser.id,
                    email: newUser.email,
                    token
                }
            }
        );

    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                status: "error",
                message: "Server error"
            }
        );
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        
        const {email, password} = req.body;

        // Is there a user?
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        if(user.rows.length === 0){
            return res.status(400).json(
                {
                    status : "error",
                    message: "Invalid credentials"
                }
            )
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword){
            return res.status(400).json({
                status: "error",
                message: "Password is incorrect"
            })
        }

        const token = jwt.sign(
            { userId: user.rows[0].id, email: user.rows[0].email },
            process.env.JWT_SECRET || "your_jwt_secret",
            { expiresIn: "7d" }
        );
        
        res.json({ token, user: { id: user.rows[0].id, email: user.rows[0].email } });


    } catch (error) {
        res.status(500).json(
            {
                status: "error",
                message: "Server error"
            }
        );
    }
}