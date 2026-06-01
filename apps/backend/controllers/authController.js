import { User } from '../models/user.js'
import { hashPassword, comparePassword } from '../utils/utils.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "please provide all fields" })
        }

        //check if user exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already exits" })
        }

        //password validation
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters long" })
        }

        //email validation
        if (!email.includes("@")) {
            return res.status(400).json({ message: "invalid email" })
        }

        //hash password
        const hashedPassword = await hashPassword(password)

        //create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        //TODO: generate email to notify user of account creation

        //save user
        await user.save()

        res.status(201).json({ message: "user registered successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "please provide email and password" })
        }

        //check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        //check password
        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "invalid credentials" })
        }

        //generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        //set http only cookie
        const isSecure = process.env.NODE_ENV === "production" || req.secure || req.get("x-forwarded-proto") === "https";

        //set http only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: isSecure,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        })

        res.status(200).json({
            message: "user logged in successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "user logged out successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const getMe = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "unauthorized" })
    }
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        res.status(200).json({
            message: "user fetched successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}