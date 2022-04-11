const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    seller_id: {type: mongoose.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    picture: {type: String, /* required: true */},
    description: {type: String, required: true},
    base_price: {type: Number, required: true},
    beginning_of_the_auction: {type: Date, required: true},
    end_of_the_auction: {type: Date, required: true},
    bidders: 
    [
        {
        buyer_id: {type: mongoose.Types.ObjectId, ref: 'User'},
        amount: {type: Number, required: true},
        }
    ]
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = {Product};