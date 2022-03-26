import mongoose from "mongoose";

let ListingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [100, 'Max length exceeded']
    },
    description: {
        type: String,
        required: true,
        maxLength: [400, 'Max length exceeded']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        address: {
            type: String,
            required: true,
            maxLength: [50, 'Max length of address exceeded']
        },
        city: {
            type: String,
            required: true,
            maxLength: [50, 'Max length of city exceeded']
        },
        postcode: {
            type: String,
            required: true,
            maxLength: [10, 'Max length of postcode exceeded']
        },
        country: {
            type: String,
            required: true,
            maxLength: [50, 'Max length of country exceeded']
        }
    },
    views: Number,
    category: {
        type: [String],
        enum: [
            'Cloths',
            'Shoes',
            'Gaming',
            'Electronics',
            'Mobile Phones',
            'Auto mobile',
            'Others'
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Listing', ListingSchema)
