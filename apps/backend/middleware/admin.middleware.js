export const admin = (req, res, next) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(403).json({message: "Only admins can access this route"})
    }
    next()
}