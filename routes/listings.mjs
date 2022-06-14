import express from 'express';
import { getListings, getListing, createListing, updateListing, deleteListing } from '../controllers/listings.mjs'
import authGuard from "../middlewares/auth.mjs";

const router = express.Router();

router.route('/').get(getListings).post(authGuard, createListing)
router.route('/:id').get(getListing).put(authGuard, updateListing).delete(authGuard, deleteListing)

export default router;
