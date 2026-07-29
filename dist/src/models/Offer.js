import mongoose, { Schema } from "mongoose";
let offerSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageId: { type: String, required: false }
});
const Offer = mongoose.model("Offer", offerSchema);
export { Offer };
//# sourceMappingURL=Offer.js.map