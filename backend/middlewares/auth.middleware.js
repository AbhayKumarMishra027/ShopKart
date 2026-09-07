import Customer from "../models/customer.model.js";
import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication Required"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }

    let customer;

    try {
        customer = await Customer.findById(decoded.userId)
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

    if (!customer) {
        return res.status(401).json({
            message: "User not found"
        })
    }
    req.user = customer;
    next();
}

export default authMiddleware;