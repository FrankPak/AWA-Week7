import { Request, Response, Router } from "express";
import path  from "path"
import {Offer, IOffer} from "../models/Offer.js"
import upload from "../middleware/multer-config.js";
import { Image, IImage } from "../models/Image.js";

const router: Router = Router()


router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const title: string = req.body.title
    const description: string = req.body.description
    const price: number = req.body.price


    if (!req.file) {
      console.log("noFile")
        const offer: IOffer = new Offer({
          title: title,
          description: description,
          price: price
        })
        await offer.save()
        return res.status(201).json({ message: `Offer added successfully.` })
    }
    console.log("File found")

    const imgPath: string = req.file.path.replace("public", "")

    const image: IImage = new Image({
      filename: req.file.filename,
      path: imgPath
    })

    await image.save()

    const offer: IOffer = new Offer({
      title: title,
      description: description,
      price: price,
      imageId: image._id.toString() // image id to offer
    })
    

    await offer.save()
    return res.status(201).json({ message: `Offer added successfully.` })

  } catch (error: any) {
      console.error(`Error while saving offer: ${error}`)
      return res.status(500).json({ error: "Internal server error" })
  }
})

router.get('/offers', async (req: Request, res: Response) => {
  try {
    const offers: IOffer[] | null = await Offer.find()
   
    const resOffers = await Promise.all(
      offers.map(async (offer) => {
        const image: IImage | null = await Image.findById(offer.imageId)

        return {
          title: offer.title,
          description: offer.description,
          price: offer.price,
          imagePath: image ? image.path : null
        }
      })
    )

    return res.status(200).json(resOffers)
  } catch (error: any) {
    console.error(`Error while fetching offers: ${error}`)
    return res.status(500).json({ error: "Internal server error" })
  }
})

export default router