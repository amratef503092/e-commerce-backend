
// i want to create a utility function that will handle the response of the api

exports.apiResponse = (res, status, message, data) => 
{
    res.status(status).json({
        status,
        message,
        data
    });
}