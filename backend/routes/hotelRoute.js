import express from "express";
const router = express.Router();
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  getHotelRooms,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

router.route("/")
.post(verifyAdmin, createHotel)
.get(getAllHotels);

router.route("/countByCity").get(countByCity)
router.route("/countByType").get(countByType)
router.route("/room/:id").get(getHotelRooms)

router.route("/:id")
.put(verifyAdmin, updateHotel)
.delete(verifyAdmin, deleteHotel)
.get(getHotel);

export default router;
