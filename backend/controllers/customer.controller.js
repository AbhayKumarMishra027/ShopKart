import Customer from "../models/customer.model.js"
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";

const registerCustomer = async (req, res) => {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password || !phone) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        })
    }

    let customer;

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const normalizedEmail = email.trim().toLowerCase();

        customer = await Customer.create({ fullName, email: normalizedEmail, password: hashedPassword, phone })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Email or phone already registered"
            })
        }
        return res.status(500).json({
            message: "Internal Server Error"
        })

    }

    const customerData = customer.toObject();
    delete customerData.password;

    return res.status(201).json({
        message: "Customer registered successfully",
        customer: customerData
    })
}


const loginCustomer = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    const normalizedEmail = email.trim().toLowerCase();

    const customer = await Customer.findOne({ email: normalizedEmail });
    if (!customer) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }
    const token = generateToken(customer._id)
    res.cookie("auth_token", token, { httpOnly: true, secure: false, sameSite: "lax" })

    const customerData = customer.toObject();
    delete customerData.password;

    return res.status(200).json({
        message: "Login Successful",
        customer: customerData
    })
}

const getMe = async (req, res) => {
    const customerData = req.user.toObject();
    delete customerData.password;

    return res.status(200).json({
        message: "Customer fetched successfully",
        customer: customerData
    })
}

const logoutCustomer = async (req, res) => {
    res.clearCookie("auth_token")
    return res.status(200).json({
        message: "Logout Successfull"
    })
}


export { registerCustomer, loginCustomer, getMe, logoutCustomer }