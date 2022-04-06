import {Router} from "express";
import getProducts from "./products/getProducts";
import getCategories from "./categories/getCategories";

const router = Router()

router.get('/products', getProducts.handle)
router.get('/categories', getCategories.handle)

module.exports = {
    router: router
}