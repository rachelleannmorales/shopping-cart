'use strict'

import {BaseModel} from "./BaseModel";
import {Model} from "objection";
import {Product} from "./Product";

export class CartItem extends BaseModel {
    static get tableName () {
        return 'cart_item'
    }
    static get relationMappings () {
        return {
            product: {
                relation: Model.HasOneRelation,
                modelClass: Product,
                join: {
                    from: 'cart_item.id',
                    to: 'products.id',
                }
            },
        }
    }
}