const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    seller_id: {type: mongoose.Types.ObjectId, ref: 'User'},
    seller_first_name: {type: String, ref: 'User'},
    seller_last_name: {type: String, ref: 'User'},
    title: {type: String, required: true},
    picture: {type: String, /* required: true */},
    description: {type: String, required: true},
    base_price: {type: Number, required: true},
    beginning_of_the_auction: {type: Date, required: true},
    end_of_the_auction: {type: Date, required: true},
    bidders: 
    [
        {
        bidder_id: {type: mongoose.Types.ObjectId, ref: 'User'},
        bidder_first_name: {type: String, required: true, ref: 'User'},
        bidder_last_name: {type: String, required: true, ref: 'User'},
        bidder_amount: {type: Number, required: true},
        }
    ]
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = {Product};