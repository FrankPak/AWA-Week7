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
    body("password").isLength({min: 5}),
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

userRouter.get('/api/user/list',  async (req: Request, res: Response) => {
    
})

export default userRouter