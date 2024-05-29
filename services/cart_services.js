
const CartModel = require('../models/cart_model');
const CheckoutOrder = require('../models/check_out_model');
const { deleteOne, createOne, getOne, getAll } = require('./handlersFactory');
const { apiResponse } = require('../utility/api_resource');
const CalculatePrice = require('../utility/helper/price_helpers');
const asyncHandler = require('express-async-handler');

// desc   Get cart
// route  GET /api/v1/cart
// access Private -> user only

exports.getCartUser = async (req, res, next) => {
    const user = req.user;
    console.log(user.id);
    const cart = await CartModel.findOne({ user: user.id });
    if (!cart) {
        return res.status(404).json({ message: "cart not found" });
    }

    return apiResponse(res, 200, "success", cart);

};

// desc   Add to cart
// route  POST /api/v1/cart/addToCart
// access Private -> user only 
exports.addProductToCart = async (req, res, next) => {
    const user = req.user;
    const { products } = req.body;

    console.log(req.body);
    console.log("____________________");
    console.log(products);
    console.log("____________________");
    console.log(user.id);

    // console.log(product);
    const cart = await CartModel.findOne({ user: user.id });
    // // if not found cart  create cart 
    if (!cart) {
        const newCart = await CartModel.create
            ({
                user: user.id,
                products: products
            });
        return apiResponse(res, 200, "success", newCart);
    }
    console.log(cart.products);
    products.forEach(product => {
        const index = cart.products.findIndex(p => {
            console.log(p.productId.toString());
            console.log(product.productId);
            return p.productId._id.toString() === product.productId
        });
        console.log(index);
        if (index !== -1) {
            cart.products[index].quantity = product.quantity;
        }
        else {
            cart.products.push(product);
        }
    });
    await cart.save();
    return apiResponse(res, 200, "success", cart);
};
// desc checkout
// route POST /api/v1/cart/checkout
// access Private -> user only
exports.checkout = async (req, res, next) => {
    const user = req.user;
    const cart = await CartModel.findById(
        req.body.cartId
    );
    if (!cart) {
        return res.status(404).json({ message: "cart not found" });
    }
    const { products } = cart;
    const totalPrice = products.reduce((acc, product) => {
        const discountedPrice = CalculatePrice.calculateDiscountPrice(product.productId);
        return acc + (discountedPrice * product.quantity);
    }, 0);


    const newOrder = await CheckoutOrder.create({
        user: user.id,
        products,
        totalPrice,
        deliveryAddress: "amr"

    });
    cart.products = [];
    await cart.save();
    return apiResponse(res, 200, "success", newOrder);
}

// desc   delete product from cart
// route  DELETE /api/v1/cart/deleteProduct/:id
// access Private -> user only

exports.deleteProductFromCart = async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    const cart = await CartModel.findOne({ user: user.id });
    if (!cart) {
        return res.status(404).json({ message: "cart not found" });
    }
    const index = cart.products.findIndex(p => p.productId._id.toString() === id);
    if (index === -1) {
        return res.status(404).json({ message: "product not found" });
    }
    cart.products.splice(index, 1);
    await cart.save();
    return apiResponse(res, 200, "success", 'product deleted');
};


// desc delete one product from cart
// route DELETE /api/v1/cart/deleteOneProduct
// access Private -> user only
exports.deleteOneProduct = asyncHandler(async (req, res, next) => {
    const { productId } = req.body;
    const user = req.user;
    const cart = await CartModel.findOne({ user: user.id });
    if (!cart) {
        return res.status(404).json({ message: "cart not found" });
    }
    const index = cart.products.findIndex(p => p.productId._id.toString() === productId);
    if (index === -1) {
        return res.status(404).json({ message: "product not found" });
    }
    cart.products.splice(index, 1);
    await cart.save();
    return apiResponse(res, 200, "success", 'product deleted');
});


// delet all product from cart
// route DELETE /api/v1/cart/deleteAllProduct
// access Private -> user only
exports.deleteCart = async (req, res, next) => {
    const user = req.user;
    const cart = await CartModel.findOne({ user: user.id });
    if (!cart) {
        return res.status(404).json({ message: "cart not found" });
    }
    cart.products = [];
    await cart.save();
    return apiResponse(res, 200, "success", 'cart deleted');
}

// get all carts
// route GET /api/v1/cart/getUserCarts
// access Private -> user only
exports.getCart = getOne(CartModel);

// get all carts
// route GET /api/v1/cart/getAllCarts
// access Private -> admin only
exports.getAllCarts = getAll(CartModel);

exports.createCart = createOne(CartModel);

// get all checkout orders
// route GET /api/v1/cart/getAllCheckoutOrders
// access Private -> user only
exports.getCheckoutAllOrder = asyncHandler(async (req, res, next) => {
    const orders = await CheckoutOrder.find(
        {
            user: req.user.id,
            status: "pending"
        }
    );

    return apiResponse(res, 200, "success", orders);
});

