import {Router} from "express";
import getProducts from "./products/getProducts";
import getCategories from "./categories/getCategories";
import {addToCart, createCart, getCart} from "./cart";

const router = Router()

router.get('/products', getProducts.handle)
router.get('/categories', getCategories.handle)

router.post('/cart', createCart)
router.get('/cart/:id', getCart)
router.post('/cart/:id/add', addToCart)

module.exports = {
    router: router
}