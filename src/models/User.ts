import db from '@libs/db'
import * as Promise from 'bluebird'
import { Picture } from '@models'
export const User = db.Model.extend({
    tableName: 'user',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(Picture, 'picture_id', 'id')
    }
}, {
    getUser: Promise.method((id) => {
        return new User({ id }).fetch({ withRelated: ['picture'] }).then((result) => {
            return result.omit('password')
        })
    })
}) as any
/**
 * `id` int(11) NOT NULL,
 * `username` varchar(45) NOT NULL,
 * `password` varchar(45) NOT NULL,
 * `create_time` timestamp NULL DEFAULT NULL,
 * `update_time` timestamp NULL DEFAULT NULL,
 * `email` varchar(45) NOT NULL,
 */
