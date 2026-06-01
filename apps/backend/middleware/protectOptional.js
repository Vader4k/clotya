import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

export const protectOptional = async (req, res, next) => {
    try {
        let token = req.cookies.token

        if (!token) {
            //no user, continue as guest
            return next()
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password -__v -createdAt -updatedAt')
        next()
    } catch (error) {
        //invalid token, continue as guest
        return next()
    }
}