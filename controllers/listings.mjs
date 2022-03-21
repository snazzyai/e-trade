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
export const getListing = (req, res, next) => {
    res.status(200).json({ success: true, message: `get listing from id ${req.params.id}` });
}

/* 
    @desc Create new listing
    @route POST /api/v1/listings
    @access Private
*/
export const createListing = (req, res, next) => {
    res.status(200).json({ success: true, message: `created new listing` });
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