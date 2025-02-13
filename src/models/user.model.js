// A Mongoose model for a "User" collection in a MongoDB database.
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // To enable searching field
        },   
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },   
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },   
        avatar: {
            type: String, // gives url for video, files etc. cloudinary
            required: true
        },
        coverImage: {
            type: String
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if( !this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10) // 10 hash rounds
    next()
})
// just before data is saved and its a async function because it's a somwhat lengthy process

// This code defines a custom instance method called isPasswordCorrect on a Mongoose schema (userSchema). It is used to check whether a given password matches the stored (hashed) password in the database.

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password) 
    // gives true or false
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)