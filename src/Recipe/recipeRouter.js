import path from "node:path";
import { fileURLToPath } from "node:url"; 
import express from "express";
import multer from "multer";


import { createRecipe } from "./recipeController.js";
import authenticate from "../middleware/authentication.js";

const recipeRouter = express.Router();
const __filename = fileURLToPath(import.meta.url); // Get current file path
const __dirname = path.dirname(__filename); // Get directory name 

// file store local
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  //todo: set file limit from 30MB to 10MB
  limits: { fileSize: 3e7 }, //it's 30MB
});

recipeRouter.post(
  "/",
  authenticate,
  upload.fields([
    {
      name: "recipeImage",
      maxCount: 1,
    },
  ]),
  createRecipe
);

// recipeRouter.post(
//     "/",
//     authenticate,
//     createRecipe
//   );

// recipeRouter.patch(
//   "/:recipeId",
//   authenticate,
//   upload.fields([
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//     {
//       name: "file",
//       maxCount: 1,
//     },
//   ]),
//   updateRecipe
// );

// bookRouter.get("/", listRecipes);

// bookRouter.get("/:recipeId", getSingleRecipe);

// bookRouter.delete("/:recipeId", authenticate, deleteRecipe);

export default recipeRouter;