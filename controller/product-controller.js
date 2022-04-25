require('../middleware/authenticate-middleware');
const {Product} = require('../models/product-schema');
const {User} = require('../models/user-schema');
const jwt = require('jsonwebtoken');

get_all_products = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.send(err + 'test to see if this is working');
        }
        res.send(products);
    });
};

get_products_per_user = (req, res) => {
  Product.find({seller_id: req.params.id}, (err, products) => {
        if (err) {
            res.send(err);
        }
        res.send(products);
    }
    );
};

create_product = (req, res) => {

    const seller_id = get_user_id_from_token(req, res);

    const product = new Product(
        {
            seller_id: seller_id,
            ...req.body
            //picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        );
    product.save((err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(`${product} with seller_id ${seller_id} has been created successfully`);
        }
    });
};

get_product_by_id = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.send(product);
    });
};

modify_product = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`${product} with id ${product._id} has been modified successfully`);
        }
    });
};

add_bidders_to_product = (req, res) => {
    
    const bidder_id = get_user_id_from_token(req, res);
    let user = User.findById(bidder_id);
    const bidder_first_name = user.first_name;
    const bidder_last_name = user.lastName;

    console.log(user);
    console.log(bidder_first_name);
    console.log(bidder_last_name);

    Product.findByIdAndUpdate(
        req.params.id, 
        {$push: {
            bidders: 
            {
             bidder_id: bidder_id,
             bidder_first_name: bidder_first_name,
             bidder_last_name: bidder_last_name,
             bidder_bid_amount: req.body.bidder_bid_amount}}}, 
        {new: true}, 
        (err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`${product}, ${user} with id ${product._id} has been modified successfully`);
        }
    });
};

delete_product = (req, res) => {
   Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`${product} with id ${product._id} has been deleted successfully`);
        }
    });
};

get_user_id_from_token = (req, res) => {

    const authToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(authToken, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const userIdInToken = userId.toString();
    
    return userIdInToken;
};

module.exports = {
    get_all_products,
    get_products_per_user,
    create_product,
    get_product_by_id,
    modify_product,
    add_bidders_to_product,
    delete_product
};