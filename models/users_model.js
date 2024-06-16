
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mangoose = require('mongoose');
const AddressUserModel = require('./user_address_model');

// 1- create schema

const UserSchema = new mangoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be more than 3 characters'],
        maxLength: [30, 'Name must be less than 30 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        minLength: [3, 'Email must be more than 3 characters'],
        maxLength: [30, 'Email must be less than 30 characters']
    },
    gender:
    {
        required: [true, "Gender is required"],
        type: String,
        enum: ['male', 'female']
    },
    password:
    {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be more than 6 characters"],
        maxLength: [30, "Password must be less than 30 characters"]

    },
    role:
    {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    avatar:
    {
        type: String,
        default: 'default.jpg'

    },
    phone:
    {
        type: String,
        minLength: [11, "Phone must be more than 11 characters"],
        maxLength: [11, "Phone must be less than 11 characters"]
    },
    countryCode:
    {
        type: String,
        default: '+20'
    },
    verified:
    {
        type: Boolean,
        default: false
    },
    active:
    {
        type: Boolean,
        default: true
    },
    online:
    {
        type: Boolean,
        default: false
    },
},

    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },

    }
);






// 2- hash password
UserSchema.pre('save', async function (next) 
{
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


// i want not return password
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};



UserSchema.methods.comparePassword = async function (password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
}

// 3- generate token

UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        });
}

// UserSchema.methods.updateOnlineStatus = async function () {
//     this.online = true;
//     await this.updatOne(this);
// }


// show address in user


// 2- create model

const UserModel = mangoose.model('User', UserSchema);
// 3- hash password

module.exports = UserModel;