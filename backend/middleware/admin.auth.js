const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_ADMIN_PASSWORD = process.env.JWT_SECRET_ADMIN



console.log(JWT_ADMIN_PASSWORD)
function adminAuthMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    if (decoded) {
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}

module.exports={
    adminAuthMiddleware :  adminAuthMiddleware
}