'use strict'
import { Model } from "objection";
import moment from "moment";

export class BaseModel extends Model {
    private updatedAt: string = '';
    private createdAt: string = '';

    $beforeUpdate () {
        this.updatedAt =  moment().format('YYYY-MM-DD HH:mm:ss')
    }

    $beforeInsert () {
        this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
        this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}