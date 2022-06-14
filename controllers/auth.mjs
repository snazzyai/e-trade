import mongoose from "mongoose";
import asyncHandler from "../middlewares/async.mjs";
import User from "../models/User.mjs";
import ErrorResponse from "../utils/errorResponse.mjs";


/*
    @desc Register a user
    @route POST /api/v1/auth/register
    @access Public
*/
export const register = asyncHandler(async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    const user = await User.create({
        firstname,
        lastname,
        email,
        password
    })
    if(!user){
        const message = `User could not be created`
        return next(new ErrorResponse(message, 400))
    }
    storeAndSendTokenResponse(user, 200, res)
})

/*
    @desc Login a user
    @route POST /api/v1/auth/login
    @access Public
*/
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password){
        return next(new ErrorResponse("Field cannot be empty", 400))
    }

    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorResponse("Invalid credentials", 401))
    }
    //Match passwords
    const isMatch = user.matchPasswords(password)
    if(!isMatch){
        return next(new ErrorResponse("Invalid credentials", 401))
    }

    storeAndSendTokenResponse(user, 200, res)
})

/*
    @desc Get currently logged in user
    @route POST /api/v1/auth/getuser
    @access Public
*/
export const getUser = asyncHandler(async(req, res, next)=>{
    console.log(req.user.id)
    const user = await User.findById(req.user.id)
    if(!user){
        return next(new ErrorResponse("Cannot find user", 404))
    }
    res.status(200).json({ success: true, data: user })
})


//store and send response token
const storeAndSendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()
    const cookiesOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    //add security in production env
    if(process.env.NODE_ENV === 'production'){
        cookiesOption.secure = true
    }
    res.status(statusCode).cookie('token', token, cookiesOption).json({ success: true, token})
}
