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
        return Cart.getById(id);
    }
}

export default {
    handle,
    service
}