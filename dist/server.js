import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import router from "./src/index.js";
import mongoose from 'mongoose';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const testdb = mongoose.connection;
testdb.on("error", console.error.bind(console, "MongoDB connection error"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=server.js.map