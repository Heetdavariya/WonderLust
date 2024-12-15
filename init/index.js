const mongoose = require("mongoose")
const Listing = require("../model/listing.js")
const data = require("./data.js")

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    .then(() => {
        console.log('Connected!');
    }).catch((err) => {
        console.log(err);
    });

Listing.insertMany(data.data)
console.log("Inserted success")

