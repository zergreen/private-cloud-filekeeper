const mongoose = require('mongoose')
const ImagesSchema = new mongoose.Schema({
    imageId: {
      type: String,
      required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Images', ImagesSchema)

