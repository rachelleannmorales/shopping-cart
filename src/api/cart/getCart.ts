import {Request, Response} from "express";
import {Cart} from "../../models/Cart";

export const handle = async (req:Request, res: Response) => {
    await service.getCart(req.params)
        .then((cart: Cart | undefined) => {
            res.json(cart)
        }).catch((e) => res.json(e))
}

const service = {
    getCart: async (param: any) => {
        const { id } = param;
        return Cart.query().findById(id).withGraphJoined('products').withGraphJoined('products.product');
    }
}

export default {
    handle,
    service
}