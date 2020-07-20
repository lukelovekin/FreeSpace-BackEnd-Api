const mongoose = require('mongoose')
// const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({})

// UserScema.plugin(passportLocalMongoose)

const UserModel = mongoose.model("users", UserSchema)

module.exports = { UserSchema, UserModel }

