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
            return { ...result.omit('password').toJSON(), picture: await Picture.getPictrue(result.get('picture_id')) }
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
