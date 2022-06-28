import User from "../models/User.js";

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        await updatedUser.save();
        res.status(201).json(updatedUser);
    } catch(e) {
        res.status(500).send(e);
    }
}
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);   
        res.status(201).json({message: "User deleted"});
    } catch(e) {
        res.status(500).send(e);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});  
        res.status(201).json(users);
    } catch(e) {
        next(e)
    }
}
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
    } catch(e) {
        res.status(500).send(e);
    }
}
