'use strict'
import { Model } from "objection";
import {Category} from "./Category";
import {BaseModel} from "./BaseModel";

export class Product extends BaseModel {
    public id: number;
    public quantity: number;
    public price: number;

    static get tableName () {
        return 'products'
    }
    static get relationMappings () {
        return {
            category: {
                relation: Model.HasOneRelation,
                modelClass: Category,
                join: {
                    from: 'products.categoryId',
                    to: 'categories.id'
                }
            }
        }
    }
    static getById (id: number) {
        return this.query().findById(id)
            .throwIfNotFound({
            message: 'Product does not exist',
        });
    }

    $hasStockAvailable (qty: number) {
        return this.quantity >= qty;
    }
}
