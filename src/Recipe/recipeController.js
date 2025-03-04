
import createHttpError from "http-errors";


import recipeModel from "./recipeModel.js";



const createRecipe = async (req, res, next) => {
  const { title, category,coverImage } = req.body;

//   console.log("Files", req.files);

//   const files = req.files;

//   const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
//   const fileName = files.coverImage[0].filename;
//   const filePath = path.resolve(
//     __dirname,
//     "../../public/data/uploads",
//     fileName
//   );

  try {
    //for cover image
    // const uploadResult = await cloudinary.uploader.upload(filePath, {
    //   filename_override: fileName,
    //   folder: "book-covers",
    //   format: coverImageMimeType,
    // });

    //for pdf
    // const bookFileName = files.file[0].filename;
    // const bookFilePath = path.resolve(
    //   __dirname,
    //   "../../public/data/uploads",
    //   bookFileName
    // );

    // const bookFileUploadResult = await cloudinary.uploader.upload(
    //   bookFilePath,
    //   {
    //     resource_type: "raw",
    //     filename_override: bookFileName,
    //     folder: "book-Pdfs",
    //     format: "pdf",
    //   }
    // );

    //type cast
    const _req = req;
    const newRecipe = await recipeModel.create({
      title,
      category,
      chef: _req.userId,
      coverImage:"uploading"
    //   coverImage: uploadResult.secure_url,
    });

    //delete Temp files
    // await fs.promises.unlink(filePath);
    // await fs.promises.unlink(bookFilePath);

    res.status(201).json({
      id: newRecipe._id,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading the files."));
  }
};


export { createRecipe};