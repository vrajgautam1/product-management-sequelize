require("dotenv").config(); 

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

function authMiddleware(req, res, next) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({ error: "token not provided cant allow to access" });
    }

    const token = authHeader.trim();

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        console.log("token is verified",  req.method, req.originalUrl)
        next();
    } catch (error) {
        return res.status(400).json({ invalidToken: "token is invalid or expired" });
    }
}

module.exports = authMiddleware;
