import Listing from "../models/Listing.mjs";
import ErrorResponse from "../utils/errorResponse.mjs";
import asyncHandler from "../middlewares/async.js";

/*
    @desc Get all listings
    @route GET /api/v1/listings
    @access Public
*/
export const getListings = asyncHandler(async (req, res, next) => {
        //use select as a params, can also add others as well
        let requestQuery = {...req.query}
        let optionToRemove = ['select', 'sort','limit','page']
        optionToRemove.forEach(param => delete requestQuery[param])

        //query url params with lt,lte,gt,gte,in
        let query
        let queryStr = JSON.stringify(req.query)
        queryStr = queryStr.replace(/\b(lt|lte|gt|gte|in)\b/g, match => `$${match}`)
        query = Listing.find(JSON.parse(queryStr))

        //query select url params from database
        if(req.query.select){
            const fields = req.query.select.split(',').join(' ')
            query = query.select(fields)
        }

        //query sort url params from database
        if(req.query.sort){
            const sortFields = req.query.sort.split(',').join(' ')
            console.log(sortFields)
            query = query.sort(sortFields)
        }
        else{
            query = query.sort('-createdAt')
        }

        //pagination
        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 1

        //skip documents e.g page 2 will skip the first 1 documents(limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const totalDocuments = await Listing.countDocuments()

        query = query.skip(startIndex).limit(limit)

        //pagination
        let pagination = {}
        if(endIndex < totalDocuments ){
            pagination.next = {
                page: page + 1,
                limit
            }
        }
        if(startIndex > 0  ){
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        const listing = await query
        if(!listing) {
            return next(new ErrorResponse(`Listings not found`, 404))
        }
        return res.status(200).json({success: true ,pagination, message: listing })
})

/*
    @desc Get one listing
    @route GET /api/v1/listings/:id
    @access Public
*/
export const getListing = asyncHandler(async (req, res, next) => {
        const listing = await Listing.findById(req.params.id)
        if(!listing){
            return next(new ErrorResponse(`Listing not found with id ${req.params.id}`, 404))
        }
        return res.status(200).json({success: true , data: listing })
})

/*
    @desc Create new listing
    @route POST /api/v1/listings
    @access Private
*/
export const createListing = asyncHandler(async (req, res, next) => {
        const listing = await Listing.create(req.body)
        if(!listing){
            const message = `Listing with id ${req.params.id} could not be created`
            return next(new ErrorResponse(message, 400 ))
        }
        return res.status(201).json({ success: true, data: listing })
})


/*
    @desc Update a listing
    @route PUT /api/v1/listings/:id
    @access Private
*/
export const updateListing = asyncHandler(async(req, res, next) => {
    const listing = await Listing.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
        runValidators: true
    })
    if(!listing){
        const message = `Listing with id ${req.params.id} not found`
        return next(new ErrorResponse(message, 404 ))
    }
    res.status(200).json({ success: true, data: listing });
})

/*
    @desc Delete a listing
    @route PUT /api/v1/listings/:id
    @access Private
*/
export const deleteListing = asyncHandler(async (req, res, next) => {
    const listing = await Listing.findByIdAndDelete(req.params.id)
    if(!listing){
        const message = `listing with id ${req.params.id} could not be deleted`
        return next(new ErrorResponse(message, 404))
    }
    res.status(200).json({ success: true, data: {}});
})
