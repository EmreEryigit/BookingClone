import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  updateRoomAva,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
router.route("/availability/:id").put(updateRoomAva)
router.route("/:hotelId").post(verifyAdmin, createRoom);

router.route("/").get(getAllRooms);
router.route("/:id/:hotelId").delete(verifyAdmin, deleteRoom);
router.route("/:id").put(verifyAdmin, updateRoom).get(getRoom);

export default router;
