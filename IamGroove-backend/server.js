import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";
//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
//initialize routes
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
