import multer, {StorageEngine, Multer} from "multer"
import {v4 as uuidv4 } from "uuid"
import path from "path"

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const originalname: string = path.parse(file.originalname).name
    const id: string= uuidv4()
    const extension: string = path.parse(file.originalname).ext
    
    const endFilename = `${originalname}_${id}${extension}`

    cb(null, endFilename)
  }
})

const upload: Multer = multer({ storage: storage })

export default upload