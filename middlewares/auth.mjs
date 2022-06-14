import jwt from 'jsonwebtoken'
import User from "../models/User.mjs";
import asyncHandler from "./async.mjs";
import ErrorResponse from "../utils/errorResponse.mjs";

const authGuard = asyncHandler( async (req, res, next) => {
    let token;

    //checks if header contains bearer
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    // else if(req.cookies){
    //     token = req.cookies.token
    // }
    if(!token){
        return next(new ErrorResponse("No authorization to access route", 401))
    }
    try{
        //verify token
        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded?.id)
        next()
    }catch(err){
        return next(new ErrorResponse("No authorization to access route", 401))
    }

})

export default authGuard
