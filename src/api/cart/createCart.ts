import {Request, Response} from "express";
import {Cart} from "../../models/Cart";

export const handle = async (req:Request, res: Response) => {
    await service.createCart()
        .then((cart: Cart) => {
            res.json(cart)
        }).catch((e) => res.json(e))
}

const service = {
    createCart: async () => {
        return Cart.query().insertAndFetch({});
    }
}

export default {
    handle,
    service
}