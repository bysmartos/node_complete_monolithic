import express from "express";
import {
  adminRoutes,
  cartRoutes,
  productRoutes,
  orderRoutes,
  authRouter, userRoutes
} from "./routes/index.js";
import errorCtrl from "./controllers/errorCtrl.js";
import morgan from "morgan";
import { config } from "dotenv";
import db from "./util/database.js";

config();
const app = express();

app.use(express.json());
app.use(morgan());
app.use(express.urlencoded({ extended: false }));

app.use("/api/admin", adminRoutes);

app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", cartRoutes);
app.use("/api", authRouter);
app.use("/api/user", userRoutes);

app.get("/api", (req, res) => {
  res.json("Hello");
});
app.use(errorCtrl.getError);

app.listen(8000, () => {
  console.log("server up");
});
