import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import userRouter from "./User/userRouter.js";
// import bookRouter from "./book/bookRouter.js";
import { config } from "./config/config.js";
import recipeRouter from "./Recipe/recipeRouter.js";

const app = express();

// app.use(
//   cors({
//     origin: config.frontendDomain,
//   })
// );

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Elib APIs",
  });
});

app.use("/api/users", userRouter);
app.use("/api/recipe", recipeRouter);

app.use(globalErrorHandler);

export default app;
