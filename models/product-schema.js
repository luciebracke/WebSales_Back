const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new mongoose.Schema({

    seller_id: {type: mongoose.Types.ObjectId, ref: 'User'},
    seller_first_name: {type: String, ref: 'User'},
    seller_last_name: {type: String, ref: 'User'},
    title: {
        type: String, 
        required: true,
        maxlength: [20, 'Title must be less than 20 characters']
    },
    picture: {type: String, /* required: true */},
    description: {type: String, required: true},
    base_price: {
        type: Number,
        max: [10000, 'Base price must be less than 10000']
    },
    beginning_of_the_auction: {type: Date, required: true},
    end_of_the_auction: {type: Date, required: true},
    bidders: 
    [
        {
        bidder_id: {type: mongoose.Types.ObjectId, ref: 'User', unique: true},
        bidder_first_name: {type: String, required: true, ref: 'User'},
        bidder_last_name: {type: String, required: true, ref: 'User'},
        bidder_bid_amount: {type: Number, required: true},
        }
    ],
},
);

const Product = mongoose.model('Product', ProductSchema);
ProductSchema.plugin(uniqueValidator);

module.exports = {Product};