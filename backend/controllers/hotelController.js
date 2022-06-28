import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createHotel = async (req, res, next) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(201).json(hotel);
    } catch(e) {
        next(e)
    }
}
export const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        await updatedHotel.save();
        res.status(201).json(updatedHotel);
    } catch(e) {
        res.status(500).send(e);
    }
}
export const deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);   
        res.status(201).json({message: "Hotel deleted"});
    } catch(e) {
        res.status(500).send(e);
    }
}

export const getAllHotels = async (req, res, next) => {
    const {min, max, ...others} = req.query;
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gte: min || 1, $lte: max || 999}})
            .limit(req.query.limit)  
        res.status(201).json(hotels);
    } catch(e) {
        next(e)
    }
}
export const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(201).json(hotel);
    } catch(e) {
        res.status(500).send(e);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => Hotel.countDocuments({city})));
        res.status(201).json(list);
    } catch(e) {
        next(e)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await  Hotel.countDocuments({type: "hotel"});
        const apartmentCount = await  Hotel.countDocuments({type: "apartment"});
        const resortCount =  await Hotel.countDocuments({type: "resort"});
        const villaCount =  await Hotel.countDocuments({type: "villa"});
        const cabinCount = await  Hotel.countDocuments({type: "cabin"});
        res.status(201).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: apartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount}
        ]);
    } catch(e) {
        next(e)
    }
}

export const getHotelRooms = async (req,res,next) => {
    try {
        const hotel = await  Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room => Room.findById(room)));
        res.status(200).json(list)
    } catch (e){
        next(e)
    }
}