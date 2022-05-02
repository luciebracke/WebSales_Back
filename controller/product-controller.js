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

get_products_user_bid_on = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found!' });
        }
        
        const bidProducts = await Product.find({"bidders.bidder_id": req.params.id});
        res.send(bidProducts);
    } catch (error) {
        res.status(500).send(error);
    }
};

get_product_by_id = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.send(product);
    });
};

create_product = async (req, res) => {
    
    const seller_id = get_user_id_from_token(req, res);

    let user = await User.findById(seller_id);

    // const picture = `${req.protocol}://${req.get('host')}/images/${req.file}`

    const product = new Product(
        {
            seller_first_name: user.firstName,
            seller_last_name: user.lastName,
            seller_id: seller_id,
            ...req.body,
            picture: req.file.path 
        }
        );

        console.log(req.file.filename)
    product.save((err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(`${product} with seller_id ${seller_id} has been created successfully`);
        }
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

add_bidders_to_product = async (req, res) => {
    
    const bidder_id = get_user_id_from_token(req, res);
    let user = await User.findById(bidder_id);
    
    Product.findByIdAndUpdate(
        req.params.id, 
        {$push: {
            bidders: 
            {
             bidder_id: bidder_id,
             bidder_first_name: user.firstName,
             bidder_last_name: user.lastName,
             bidder_bid_amount: req.body.bidder_bid_amount
            }}
        }, 
        {fields: {bidders: 1, title: 1}, 
          new: true},
        (err, product) => {
           if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`${product}, with ${product.title} and id ${product._id} has been modified successfully`);
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
    get_products_user_bid_on,
    get_product_by_id,
    create_product,
    modify_product,
    add_bidders_to_product,
    delete_product
};