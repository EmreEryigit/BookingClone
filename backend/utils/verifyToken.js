import  jwt  from "jsonwebtoken";
import { createError } from "./error.js";


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "No token provided"))}
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createError(401, "Invalid token"));
        req.user = user;
        next();
    })
}
export const verifyUser = async (req, res, next) => {
    verifyToken(req,res,next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not authorized to perform this action"))
        }
    })
}
export const verifyAdmin = async (req, res, next) => {
    verifyToken(req,res,next, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not authorized to perform this action"))
        }
    })
}