import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";
export const register = async (req,res,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
            ...req.body,
            password: hash,
        })
        await user.save();
        res.status(201).json(user);
    } catch(e) {
        next(e)
    }
}
export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404, "User not found"));
        const isValid = bcrypt.compareSync(req.body.password, user.password);
        if(!isValid) return next(createError(401, "Invalid password"));
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT, {expiresIn: "1h"});
        const {password, isAdmin, ...userData} = user.toObject();
        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({details: {...userData},isAdmin});
    }catch (e) {
        next(e)
    }
}