const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_USER_PASSWORD = process.env.JWT_SECRET
console.log(JWT_USER_PASSWORD)
module.exports = function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    if (decoded) {
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}

