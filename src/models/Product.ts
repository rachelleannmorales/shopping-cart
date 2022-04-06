'use strict'
import { Model } from "objection";
import {Category} from "./Category";
import {BaseModel} from "./BaseModel";

export class Product extends BaseModel {
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
}
