
import createHttpError from "http-errors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from 'node:fs'

import recipeModel from "./recipeModel.js";

const __filename = fileURLToPath(import.meta.url); // Get current file path
const __dirname = path.dirname(__filename); // Get directory name 

import cloudinary from "../config/cloudinary.js";

const createRecipe = async (req, res, next) => {
  const { title, category,recipeImage } = req.body;

  // console.log("Files", req.files);

  const files = req.files;

  const recipeImageMimeType = files.recipeImage[0].mimetype.split("/").at(-1);
  const fileName = files.recipeImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );

  // console.log(coverImageMimeType,"  ",fileName,"   ",filePath)

  try {
    //for cover image
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "recipe-images",
      format: recipeImageMimeType,
    });

    console.log(uploadResult)

    //type cast
    const _req = req;
    const newRecipe = await recipeModel.create({
      title,
      category,
      chef: _req.userId,
      recipeImageUrl:uploadResult.secure_url

    });

    //delete Temp files
    await fs.promises.unlink(filePath);

    res.status(201).json({
      id: newRecipe._id,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading the files."));
  }
};


export { createRecipe};