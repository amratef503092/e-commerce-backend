const express = require('express'); // import express
const dotenv = require('dotenv');
// to use the .env file
const swaggerUi = require('swagger-ui-express');



const app = express(); // create express app
const morgan = require('morgan')

dotenv.config(); // to use the .env file 
const database = require('./config/database');
const categoryRoute = require('./api/categoryRoute');
const subCategoryRoute = require('./api/subcategory_route');
const productRoute = require('./api/product_route');
const brandRoute = require('./api/brand_route');
const userRoute = require('./api/user_route');
const authRoute = require('./api/auth_route');
const cartRoute = require('./api/cart_route');
const addressRoute = require('./api/address_route');
const swaggerDocument = require('./swagger.json');


const ApiError = require('./utility/error');
const globalErrorHandlerMiddleware = require('./middleware/error_middleware');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan enabled');
}

// connect to database
database();

// middleware
app.use(express.json());



// route 
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/address', addressRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));






app.all('*', (req, res, next) => {
  next(new ApiError(404, `Page not found ${req.originalUrl}`));
});

// error handling middleware
app.use(globalErrorHandlerMiddleware);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});

// handle unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });




});