import ErrorResponse from "../utils/errorResponse.mjs";

const errorHandler = (err, req, res, next) => {


    let error = { ...err }

    // Mongoose Listing Errors
    // duplicate key error
    if (error.code === 11000){
        const message = `Duplicate key found with id of ${error.value}`
        error = new ErrorResponse(message, 400 )
    }
    // casting error
    if (error.name === 'CastError'){
        const message = `Error finding listing with id of ${error.value}`
        error = new ErrorResponse(message, 404)
    }

    //validation error
    //need to make it work
    if(error.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }


    return res.status(err.statusCode || 500).json({ success: false, error: err.message || 'Server error'})

}

export default errorHandler
