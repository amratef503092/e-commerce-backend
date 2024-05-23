
const jwt = require('jsonwebtoken');

class TokenService 
{
    static checkToken(token) {
        try {
            jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }

    static decodeToken(token) {
        try {
            const decode = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
            return decode;
        } catch (error) {
            return false;
        }
    }

    static getIdFromToken(token) {
        try {
            const decode = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
            return decode.id;
        } catch (error) {
            return false;
        }
    }

    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    }

   // make token invalid



}
exports.TokenService = TokenService;