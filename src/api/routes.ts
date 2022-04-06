import {Router} from "express";
import getProducts from "./products/getProducts";
import getCategories from "./categories/getCategories";
import {createCart, getCart} from "./cart";

const router = Router()

router.get('/products', getProducts.handle)
router.get('/categories', getCategories.handle)

router.post('/cart', createCart)
router.get('/cart/:id', getCart)

module.exports = {
    router: router
}