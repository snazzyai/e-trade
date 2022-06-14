import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

let UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength: [50, 'Please enter a firstname']
    },
    lastname: {
        type: String,
        required: true,
        maxLength: [50, 'Please enter a lastname']
    },
    image: {
        type: String,

        default: 'no-photo.jpg'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address'
        ]
    },
    phone: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minLength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    location: {
        city: {
            type: String,
            maxLength: [50, 'Max length of city exceeded']
        },
        postcode: {
            type: String,
            maxLength: [10, 'Max length of postcode exceeded']
        },
        country: {
            type: String,
            maxLength: [50, 'Max length of country exceeded']
        }
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

//hash password before saving in database
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//add signed JsonWebToken to method
UserSchema.methods.getSignedJwtToken = function () {
    const { JWT_SECRET, JWT_EXPIRE } = process.env
    return jwt.sign({id: this._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE
    })
}

UserSchema.methods.matchPasswords = async function (passwordEntered) {
    return await bcrypt.compare(passwordEntered, this.password)
}


export default mongoose.model('User', UserSchema)
