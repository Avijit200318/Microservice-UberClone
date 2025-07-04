import rideModel from "../models/ride.models.js";

export const createRide = async (req, res, next) => {
    const {pickup, destination} = req.body;

    const newRide = await rideModel.create({
        user: req.user._id,
        pickup,
        destination,
    });
    
}