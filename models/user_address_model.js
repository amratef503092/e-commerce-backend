const mongoes = require('mongoose');

const AddressUserSchema = new mongoes.Schema(

    {
        user:
        {
            type: mongoes.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        virtuals: true
    }
);


AddressUserSchema.pre(/^find/, function (next) {

    this.populate
        ({
            path: 'user',
            select: 'name email phone'
        });

    next();
});


const AddressUserModel = mongoes.model('AddressUser', AddressUserSchema);

module.exports = AddressUserModel;