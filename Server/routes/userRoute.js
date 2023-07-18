import express from "express";
import ExpressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import { generateToken, isAuth } from "../utilles.js";

const userRouter = express.Router();

userRouter.post('/signin', ExpressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.send({ _id: user._id, name: user.name, email: user.email, token: generateToken(user) })
        return;
    }
    res.status(401).send({ message: 'Invalid Credentials' });
}))

userRouter.post('/signup', ExpressAsyncHandler(async (req, res) => {
    const newUser = new User({ name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password) });
    const user = await newUser.save();
    res.send({ _id: user._id, name: user.name, email: user.email, token: generateToken(user) })
}))

//test if the isAuth middleware is working
userRouter.get('/',isAuth, async (req, res) => {
    res.status(200).send({ message: 'Welcome to the User API' });
})

export default userRouter;