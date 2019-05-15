import db from '@libs/db'
import { Haiyou } from '@models'
export const History = db.Model.extend({
    tableName: 'history',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getAllHistoryByUserId: async (id) => {
        return new History().where('user_id', id).fetchAll().then((model) => {
            return Promise.all(model.map(async (value) => {
                const haiyou = await Haiyou.getHaiyou(value.get('haiyou_id'))
                return { haiyou, ...value.toJSON() }
            }))
        })
    },
    saveHistory: async (userId, haiyouId) => {
        return new History({ user_id: userId, haiyou_id: haiyouId }).fetch().then((model) => {
            if (model == null) {
                new History({ user_id: userId, haiyou_id: haiyouId }).save(null, { method: 'insert' })
            } else {
                model.set('update_at', new Date())
                model.save()
            }
        })
    },
    deleteHistory: async (id) => {
        return new History({ id }).destroy().then((model) => {
            return model
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
