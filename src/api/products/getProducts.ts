import {Request, Response} from "express";
import {Product} from "../../models/Product";

const handle = async (req:Request, res: Response) => {
    await service.getProducts()
        .then((products: any) => {
            res.json(products)
        }).catch((e) => res.json(e))
}

const service = {
    getProducts: async () => {
        return Product.query().withGraphJoined('category');
    },
}

export default {
    handle,
    service
}