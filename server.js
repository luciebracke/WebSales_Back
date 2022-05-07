const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

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

const swaggerOptions = {

    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'WebSales API',
            description: 'WebSales API Information',
            version: '1.0.0',
        },
    },
    apis: ['./server.js',
        './routes/user-route.js',
        './routes/product-route.js',]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const port = process.env.PORT || 3000;

app.use(cors(corsOptions));


// app.use(express.json()); in this case, it was not adapted to the image format

//A absolument ajouter si on veut lire les données de type JSON
app.use(bodyParser.json({limit: '50mb', extended: true, type: 'application/json'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.text({limit: '50mb'}))

app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

//go to http://localhost:3000/api-docs/ to see the documentation when the server is running
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));