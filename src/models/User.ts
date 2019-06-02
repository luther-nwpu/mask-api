import db from '@libs/db'
import { Picture } from '@models'
export const User = db.Model.extend({
    tableName: 'user',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(Picture, 'picture_id', 'id')
    }
}, {
    getUser: async (id) => {
        return new User({ id }).fetch({ withRelated: ['picture'] }).then(async (result) => {
            return { ...result.omit('password'), picture: await Picture.getPicture(parseInt(result.get('picture_id'), 10)) }
        })
    }
}) as any
/**
 * `id` int(11) NOT NULL,
 * `username` varchar(45) NOT NULL,
 * `password` varchar(45) NOT NULL,
 * `create_time` timestamp NULL DEFAULT NULL,
 * `update_time` timestamp NULL DEFAULT NULL,
 * `email` varchar(45) NOT NULL,
 */
