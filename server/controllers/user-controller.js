const User = require('../model/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "MyKey"

const signup = async (req, res, next) => {
    const { name, email, password } = req.body
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        console.log("signup error");
        console.log(err);
    }

    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User already exists. Login Instead" })
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPassword
    })
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({ message: user })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log("login error");
        return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!existingUser) {
        console.log("User not found");
        return res.status(400).json({ message: "User not found. Signup please" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        console.log("Invalid Email/Password");
        return res.status(400).json({ message: "Invalid Email/Password" });
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
        expiresIn: "30s",
    });

    // Clear the cookie on the frontend by setting it to an empty string
    res.cookie(String(existingUser._id), "", {
        path: "/",
        expires: new Date(0), // Set the expiration date to the past
        httpOnly: true,
        sameSite: "lax",
    });

    // Set the new token cookie
    res.cookie(String(existingUser._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30), // Set a new expiration date
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    return res.status(200).json({ message: "Successfully Logged In", user: existingUser, token });
};


const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie
    const token = cookies.split("=")[1]
    console.log("token ",token);
    if (!token) {
        console.log("No token found");
        res.status(404).json({ message: "No token found" })
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        console.log(err);
        if (err) {
            console.log("Invalid token Error");
            return res.status(400).json({ message: "Invalid Token" })
        }
        // console.log(user.id);
        req.id = user.id
    })
    next()
}

const getUser = async (req, res, next) => {
    const userId = req.id
    let user;

    try {
        user = await User.findById(userId, "-password");
    } catch (err) {
        console.log("getUser error");
        return new Error(err)
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({ user })
}

exports.signup = signup
exports.login = login
exports.verifyToken = verifyToken
exports.getUser = getUser