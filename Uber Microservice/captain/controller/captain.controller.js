import captainModel from "../models/captain.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import blacklisttoken from "../models/blacklisttoken.model.js";

export const captainRegister = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        const captain = await captainModel.findOne({email});

        if(captain){
            return res.status(400).json({message: "Captain is already exist"});
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const newCaptain = await captainModel.create({
            name, email, password: hashPassword
        });

        const token = jwt.sign({_id: newCaptain._id}, process.env.JWT_SECRECT, {expiresIn: "24h"});

        res.cookie("token", token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});

        res.status(200).json({message: "Captain created successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel
            .findOne({ email })
            .select('+password');

        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcryptjs.compare(password, captain.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRECT, { expiresIn: '1h' });

        delete captain._doc.password;

        res.cookie('token', token);

        res.send({ token, captain });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        await blacklisttoken.create({ token });
        res.clearCookie('token');
        res.send({ message: 'Captain logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const profile = async (req, res) => {
    try {
        res.send(req.captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const toggleAvailability = async (req, res, next) => {
    try {
        const captain = await captainModel.findById(req.captain._id);
        captain.isAvailable = !captain.isAvailable;
        await captain.save();
        res.send(captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}