import express, {type Express} from 'express'
import path  from "path"
import { fileURLToPath } from "url"
import router from "./src/index.js"
import morgan from 'morgan'
import mongoose, { Connection } from 'mongoose'

const app: Express = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB);
mongoose.Promise = Promise
const testdb: Connection = mongoose.connection


testdb.on("error", console.error.bind(console, "MongoDB connection error"))




app.use(express.json())
app.use(express.urlencoded({extended: false}))
//app.use(morgan("dev"))


app.use(express.static(path.join(__dirname, "../public")))
app.use("/", router)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})