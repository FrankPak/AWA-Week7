import { Request, Response, Router } from 'express'
import bcrypt from 'bcryptjs'

import { body, Result, ValidationError, validationResult } from 'express-validator'
import jwt, { JwtPayload } from 'jsonwebtoken'
//import { User, IUser } from '../models/User'
//import { validateToken } from '../middleware/validateToken'

const userRouter: Router = Router()

interface IUser {
    email: string
    password: string
}

const userList: IUser[] = []



userRouter.post('/register', 
    body("email").trim().isLength({min: 3}).escape(),
    body("password").isLength({min: 1}),
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)
        if(!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({errors: errors.array()})
            
        }
    try {
        //const existingUser: IUser | null = await User.findOne({email: req.body.email})
        const existingUser = userList.find(user => user.email === req.body.email)
        console.log(existingUser)

        if (existingUser) {
            return res.status(403).json({message: "Email already in use"})
        }

        const salt: string = bcrypt.genSaltSync(10)
        const hash: string = bcrypt.hashSync(req.body.password, salt)

        const user: IUser = {
            email: req.body.email,
            password: hash
        }
        userList.push(user)

        return res.status(200).json(user)

    
    } catch (error: any){
        console.error(`Error during user login: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

userRouter.get('/list', async (req: Request, res: Response) => {
    try {
        return res.status(200).json(userList)
    } catch (error: any) {
        console.error(`Error during registration: ${error}`)
        return res.status(500).json({error: "Internal Server Error"})
    }
})


userRouter.post('/login',
    body("email").trim().isLength({min: 3}).escape(),
    body("password").isLength({min: 1}),
    async (req: Request, res: Response) => {
    try {
        const existingUser = userList.find(user => user.email === req.body.email)

        if (!existingUser) {
            return res.status(403).json({message: "Login failed"})
        }

        if (bcrypt.compareSync(req.body.password, existingUser.password)) {
            
            const jwtPayload: JwtPayload = {
                email: existingUser.email
            }

            const token: string = jwt.sign(jwtPayload, process.env.SECRET as string, { expiresIn: "2m"})

            return res.status(200).json({success: true, token})
        }
        return res.status(401).json({message: "Login failed"})

    
    } catch (error: any){
        console.error(`Error during user login: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default userRouter