import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            req.userId = jwt.verify(token, 'Netflix2024')
            next()
        } catch (err) {
            console.log(err)
            return res.status(403).json({
                message: "Access is denied"
            })
        }
    } else {
        return res.status(403).json({
            message: "Access is denied"
        })
    }
}