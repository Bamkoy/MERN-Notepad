 import mongoose from "mongoose";

//1 - Create a schema
const noteSchema = new mongoose.Schema({
        title: {
            type:String,
            required: true,
        },
        content: {
            type:String,
            required: true,
        },
    },
    {timestamps:true} //createdAt , updatedAt
);

// 2 - model based off of that schema
const Note = mongoose.model("Note", noteSchema);
// 3 - export the model
export default Note;