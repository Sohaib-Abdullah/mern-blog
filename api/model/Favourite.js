const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    fav_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
    
})

module.exports = mongoose.model("Favourite", FavouriteSchema)