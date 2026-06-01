export const user = (req, res, next) => {
    if(!req.user || req.user.role !== "user"){
        return res.status(403).json({message: "Only users can access this route"})
    }
    next()
}