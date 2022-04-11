const {Product} = require('../models/product-schema');
const {User} = require('../models/user-schema');

get_all_products = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.send(err);
        }
        res.send(products);
    });
};

create_product = (req, res) => {
    const product = new Product(
        {
            seller_id: req.body.seller_id,
            title: req.body.title,
            //picture: req.body.picture,
            description: req.body.description,
            base_price: req.body.base_price,
            beginning_of_the_auction: req.body.beginning_of_the_auction,
            end_of_the_auction: req.body.end_of_the_auction,
            bidders: req.body.bidders
        }
        );
    product.save((err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(`${product} with id ${product._id} has been created successfully`);
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

delete_product = (req, res) => {
   Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`${product} with id ${product._id} has been deleted successfully`);
        }
    });
};

module.exports = {
    get_all_products,
    create_product,
    modify_product,
    delete_product
};