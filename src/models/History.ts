import db from '@libs/db'
import { Haiyou } from '@models'
export const History = db.Model.extend({
    tableName: 'history',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getAllHistoryByUserId: async (id) => {
        new History().where('user_id', id).fetchAll().then((model) => {
            return Promise.all(model.map(async (value) => {
                const haiyou = await Haiyou.getHaiyou(value.get('haiyou_id'))
                return { haiyou, ...value.toJSON() }
            }))
        })
    }
}) as any
/**
 * `id` int(11) NOT NULL AUTO_INCREMENT,
 * `user_id` int(11) DEFAULT NULL,
 * `haiyou_id` int(11) DEFAULT NULL,
 * `create_at` timestamp NULL DEFAULT NULL,
 * `update_at` timestamp NULL DEFAULT NULL,
 * PRIMARY KEY (`id`)
 */
