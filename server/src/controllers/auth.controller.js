import User from "../models/user.model.js";
import generateToken from "../utility/generateToken.js";
import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password)
        throw new ApiError(400, "Name, Email and Password are required!")

    const existingUser = await User.findOne({ email })

    if (existingUser)
        throw new ApiError(409, "User already exists with this email")

    const user = await User.create({
        name,
        email,
        password,
    })

    const token = await generateToken(user._id)

    res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        throw new ApiError(400, "Name, Email and Password are required!")

    const user = await User.findOne({ email }).select("+password");

    if (!user)
        throw new ApiError(401, "Invalid email or password")

    const isPasswordCorrect = await user.matchPassword(password)

    if (!isPasswordCorrect)
        throw new ApiError(401, "Invalid email or password")

    const token = generateToken(user._id)

    res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        success: true,
        message: "Login successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    })
})

export const getCurrent = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Authenticated",
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            createdAt: req.user.createdAt,
        },
    });
});

