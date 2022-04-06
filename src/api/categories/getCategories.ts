import {Request, Response} from "express";
import {Category} from "../../models/Category";

const handle = async (req:Request, res: Response) => {
    await service.getCategories()
        .then((categories: Category[]) => {
            res.json(categories)
        }).catch((e) => res.json(e))
}

const service = {
    getCategories: async () => {
        return Category.query()
    }
}

export default {
    handle,
    service
}