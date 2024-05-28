const ApiError = require('../utility/error');

const sendErrorForDev = (err, res) =>
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });

const sendErrorForProd = (err, res) =>
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });

const handleJwtInvalidSignature = () =>
    new ApiError('Invalid token, please login again..', 401);

const handleJwtExpired = () =>
    new ApiError('Expired token, please login again..', 401);

const handleDuplicateKeyError = (error) => {
    const message = `Duplicate field value: Please use another value! `;
    const data = {
        message: error.message,
        value: error.keyValue,
    }
    return new ApiError(data, 400);

}



const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res);
    } else {
        if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignature();
        if (err.name === 'TokenExpiredError') err = handleJwtExpired();
        if (err.name === 'duplicate key error collection') err = handleJwtExpired();


        sendErrorForProd(err, res);
    }
};

module.exports = globalError;