import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { stat } from "node:fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes").default);
app.use("/favorites", require("./routes/favoriteRoutes").default);
app.use("/weather", require("./routes/weatherRoutes").default);

app.get("/health", (req,res) => {
    res.json({status: "ok",message: "Server is running"});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;