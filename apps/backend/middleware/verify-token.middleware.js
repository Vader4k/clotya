import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

export const protect = async (req, res, next) => {
    let token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password")

        if(!req.user){
            return res.status(401).json({message: "User not found"})
        }

        if(req.user.isActive === false){
            return res.status(401).json({message: "User is not active"})
        }

        next()
    } catch (error) {
        return res.status(401).json({message: "Token invalid or expired"})
    }
}