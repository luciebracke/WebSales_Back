const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user-route');
const productRoute = require('./routes/product-route');

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const port = process.env.PORT || 3000;

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));

//A absolument ajouter si on veut lire les données de type JSON
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);