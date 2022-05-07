const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

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