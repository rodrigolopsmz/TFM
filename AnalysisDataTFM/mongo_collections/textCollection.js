import mongoose from "mongoose";
const TextSchema = new mongoose.Schema({
    linkURL: String,
    textDocument: String,
    keyword: String,
});
export const TextModel = new mongoose.model('Text', TextSchema);