const mangoose = require('mongoose');

const dbConnection = () => {
    mangoose.connect(process.env.DB_HOST).
        then(() =>
            console.log('Connected to MongoDB')).
        catch(err =>
            console.error('Could not connect to MongoDB', err))
}
module.exports = dbConnection;