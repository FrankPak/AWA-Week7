import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const originalname = path.parse(file.originalname).name;
        const id = uuidv4();
        const extension = path.parse(file.originalname).ext;
        const endFilename = `${originalname}_${id}${extension}`;
        cb(null, endFilename);
    }
});
const upload = multer({ storage: storage });
export default upload;
//# sourceMappingURL=multer-config.js.map