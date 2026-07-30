"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_js_1 = require("../models/Offer.js");
const multer_config_js_1 = __importDefault(require("../middleware/multer-config.js"));
const Image_js_1 = require("../models/Image.js");
const router = (0, express_1.Router)();
router.post('/upload', multer_config_js_1.default.single('image'), async (req, res) => {
    try {
        console.log(req.body);
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        if (!req.file) {
            console.log("noFile");
            const offer = new Offer_js_1.Offer({
                title: title,
                description: description,
                price: price
            });
            await offer.save();
            return res.status(201).json({ message: `Offer added successfully.` });
        }
        console.log("File found");
        const imgPath = req.file.path.replace("public", "");
        const image = new Image_js_1.Image({
            filename: req.file.filename,
            path: imgPath
        });
        await image.save();
        const offer = new Offer_js_1.Offer({
            title: title,
            description: description,
            price: price,
            imageId: image._id.toString() // image id to offer
        });
        await offer.save();
        return res.status(201).json({ message: `Offer added successfully.` });
    }
    catch (error) {
        console.error(`Error while saving offer: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/offers', async (req, res) => {
    try {
        const offers = await Offer_js_1.Offer.find();
        const resOffers = await Promise.all(offers.map(async (offer) => {
            const image = await Image_js_1.Image.findById(offer.imageId);
            return {
                title: offer.title,
                description: offer.description,
                price: offer.price,
                imagePath: image ? image.path : null
            };
        }));
        return res.status(200).json(resOffers);
    }
    catch (error) {
        console.error(`Error while fetching offers: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map