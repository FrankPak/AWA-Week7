import mongoose, { Schema } from "mongoose";
let imageSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true }
});
const Image = mongoose.model("Image", imageSchema);
export { Image };
//# sourceMappingURL=Image.js.map