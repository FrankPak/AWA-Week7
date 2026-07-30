"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
//import { User, IUser } from '../models/User'
//import { validateToken } from '../middleware/validateToken'
const userRouter = (0, express_1.Router)();
const userList = [];
userRouter.post('/register', (0, express_validator_1.body)("email").trim().isLength({ min: 3 }).escape(), (0, express_validator_1.body)("password").isLength({ min: 1 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //const existingUser: IUser | null = await User.findOne({email: req.body.email})
        const existingUser = userList.find(user => user.email === req.body.email);
        console.log(existingUser);
        if (existingUser) {
            return res.status(403).json({ message: "Email already in use" });
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        const user = {
            email: req.body.email,
            password: hash
        };
        userList.push(user);
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
userRouter.get('/list', async (req, res) => {
    try {
        return res.status(200).json(userList);
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
userRouter.post('/login', (0, express_validator_1.body)("email").trim().isLength({ min: 3 }).escape(), (0, express_validator_1.body)("password").isLength({ min: 1 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //const existingUser: IUser | null = await User.findOne({email: req.body.email})
        const existingUser = userList.find(user => user.email === req.body.email);
        console.log(existingUser);
        if (existingUser) {
            return res.status(403).json({ message: "Email already in use" });
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        const user = {
            email: req.body.email,
            password: hash
        };
        userList.push(user);
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map