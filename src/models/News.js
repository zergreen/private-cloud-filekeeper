const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
    newsId: {
      type: String,
      required: true,
    },
    topic: { type: String, required: false },
    detail: { type: String, required: false },
    writer: { type: String, required: false },
    category: { type: String, required: false },
    createdAt: {
        type: Date,
        default: Date.now,
      },
 });

module.exports = mongoose.model('News', NewsSchema)