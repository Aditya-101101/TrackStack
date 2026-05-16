import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import asyncHandler from '../utility/asyncHandler.js'
import ApiError from '../utility/ApiError.js'


export const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer "))
        token = authHeader.split(" ")[1]

    if (!token)
        throw new ApiError(401, "Not authorized , token missing")

    if (!process.env.JWT_SECRET)
        throw new ApiError(500, "JWT_SECRET is missing in server environment");

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    if (!user)
        throw new ApiError(401, "Not authorized, user no longer exists")

    req.user = user
    next()
}) 