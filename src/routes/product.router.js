const express = require('express');
const { PORT } = require('../config/env.config.js');
const ProductController = require('../controllers/product.controller.js');
const Auth = require('../middlewares/auth.js');
const auth = new Auth
const productController = new ProductController
const productRouter = express.Router();
const ProductManagerMongoose = require('../services/product.service.js');
const productManagerMongoose = new ProductManagerMongoose;


productRouter.get("/", async (req, res) => {
    let cartId = await req.session.user.cartID
    let getAll = await productManagerMongoose.getAll(req.query, req.originalUrl);
    const { payload } = getAll
    let products = payload.map((payload) => {
        return { title: payload.title, description: payload.description, price: payload.price, stock: payload.stock, _id: JSON.stringify(payload._id) }
    })
    return res.render("products", { products, getAll, cartId, PORT })
})

productRouter.post('/', auth.isAdmin, productController.createOne);

module.exports = productRouter;