const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');

const userRoute = require('./routes/user-route');
const productRoute = require('./routes/product-route');

let corsOptions = {
    origin: 'http://localhost:3000',
};

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));

app.use(cors(corsOptions));

//A absolument ajouter si on veut lire les données de type JSON
app.use(express.json());
app.use(express.bodyParser({limit: '50mb'}));
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);