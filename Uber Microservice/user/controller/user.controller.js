import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import blacklisttoken from "../models/blacklisttoken.model.js";

export const userRegister = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        const user = await userModel.findOne({email});

        if(user){
            return res.status(400).json({message: "User is already exist"});
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = await userModel.create({
            name, email, password: hashPassword
        });

        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRECT, {expiresIn: "24h"});

        res.cookie("token", token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});

        res.status(200).json({message: "User created successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel
            .findOne({ email })
            .select('+password');

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, { expiresIn: '1h' });

        delete user._doc.password;

        res.cookie('token', token);

        res.send({ token, user });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        await blacklisttoken.create({ token });
        res.clearCookie('token');
        res.send({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const profile = async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}