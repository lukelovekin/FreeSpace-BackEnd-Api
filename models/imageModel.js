const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    title: String,
    image: String,
    ImageId: String
})

const Image = mogoose.model('Image', ImageSchema)
module.exports = Image