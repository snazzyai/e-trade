import Listing from "../models/Listing.mjs";

/*
    @desc Get all listings
    @route GET /api/v1/listings
    @access Public
*/
export const getListings = (req, res, next) => {
    res.status(200).json({ success: true, message: 'get all listings' });
}

/*
    @desc Get one listing
    @route GET /api/v1/listings/:id
    @access Public
*/
export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if(!listing){
            return res.status(401).json({ success: false , message:'listing not found'})
        }

        return res.status(200).json({success: true , message: listing })

    } catch(err){
        next(err)
    }
}

/*
    @desc Create new listing
    @route POST /api/v1/listings
    @access Private
*/
export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        if(!listing){
            return res.status(400).json({message: "unsuccessful"})
        }
        return res.status(201).json({ message: "success", data: listing })
    }catch(err){
        next(err)
    }
}

/*
    @desc Update a listing
    @route PUT /api/v1/listings/:id
    @access Private
*/
export const updateListing = (req, res, next) => {
    res.status(200).json({ success: true, message: `update listing from id ${req.params.id}` });
}

/*
    @desc Delete a listing
    @route PUT /api/v1/listings/:id
    @access Private
*/
export const deleteListing = (req, res, next) => {
    res.status(200).json({ success: true, message: `delete listing from id ${req.params.id}` });
}
