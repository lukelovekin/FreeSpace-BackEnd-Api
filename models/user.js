const mongoose = require('mongoose')
// const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String, 
    },
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: "portfolio"

    }
})

// UserScema.plugin(passportLocalMongoose)

const UserModel = mongoose.model("users", UserSchema)

module.exports = { UserSchema, UserModel }

