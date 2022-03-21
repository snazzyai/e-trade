import express from 'express';
import { getListings, getListing, createListing, updateListing, deleteListing } from '../controllers/listings.mjs'

const router = express.Router();

router.route('/').get(getListings).post(createListing)
router.route('/:id').get(getListing).put(updateListing).delete(deleteListing)

export default router;
