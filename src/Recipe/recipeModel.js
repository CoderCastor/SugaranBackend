import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipeImageUrl:{
        type:String,
        
    },
    category:{
        type:String,
        required: true
    }

},{timestamps: true})

export default mongoose.model("Recipe",recipeSchema)