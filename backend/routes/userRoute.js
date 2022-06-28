import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


router.route("/")
.get(verifyAdmin, getAllUsers); 

router.route("/:id")
.put(verifyUser,updateUser)
.delete(verifyUser,deleteUser)
.get(verifyUser, getUser)



export default router