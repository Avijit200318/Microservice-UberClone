import jwt from "jsonwebtoken";
import axios from "axios";

export const authUser = async(req, res, next) => {
    try{
        const token = req.cookies.toekn || req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // now how to get userdetails using ride service

        // this communication between ride and user is called sincronus communication. one of the disadvantage is its now depends on user route if the user route failed then it also failed.
        const response = await axios.get(`${process.env.BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const user = response.data;

        if(!user){
            return res.status(401).json({message: "Unauthorized user"});
        }

        req.user = user;

        next();
    }catch(error){
        res.status(500).json({message: error.message});
    }
}