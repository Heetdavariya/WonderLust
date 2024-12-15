const mongoose = require("mongoose")

const listeningSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    description : {
        type: String
    },
    image : {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    location : {
        type: String
    },
    country : {
        type: String
    }
})

let Listing = mongoose.model("Listing",listeningSchema)

module.exports = Listing;