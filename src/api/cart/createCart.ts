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
        return Cart.query().insert({}).then((cart: Cart) => Cart.getById(cart.id));
    }
}

export default {
    handle,
    service
}