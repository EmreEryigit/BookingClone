import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}});
        } catch(e) {
            next(e)
        }
        res.status(201).json(savedRoom);
    } catch(e) {
        next(err)
    }
}

export const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        await updatedRoom.save();
        res.status(201).json(updatedRoom);
    } catch(e) {
        res.status(500).send(e);
    }
}
export const deleteRoom = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id);  
        try {
            await Hotel.findByIdAndUpdate(req.params.hotelId, {$pull: {rooms: req.params.id}});
        }  catch (e) {
            next(e)
        }
        res.status(201).json({message: "Room deleted"});
    } catch(e) {
        res.status(500).send(e);
    }
}

export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({});  
        res.status(201).json(rooms);
    } catch(e) {
        next(e)
    }
}
export const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(201).json(room);
    } catch(e) {
        res.status(500).send(e);
    }
}
export const updateRoomAva = async (req, res,next) => {
    try {
        const room = await Room.updateOne(
            {"roomNumbers._id": req.params.id}, 
            {$push :{"roomNumbers.$.unavailableDates": req.body.dates}})
        res.status(201).json(room);
    } catch(e) {
        res.status(500).send(e);
    }
}