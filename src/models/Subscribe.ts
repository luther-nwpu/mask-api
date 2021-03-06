import db from '@libs/db'
import { User } from '@models'
export const Subscribe = db.Model.extend({
    tableName: 'subscribe',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getAllSubscribeByUserId: async (id) => {
        return new Subscribe().where('user_id', id).fetchAll().then((model) => {
            return Promise.all(model.map(async (value) => {
                const suser = await User.getUser(value.get('suser_id'))
                const subscribeCount = await Subscribe.getSubScribeCount(value.get('suser_id'))
                return { suser, subscribeCount, ...(value.toJSON()) }
            }))
        })
    },
    subscribeUser: async (userId, suserId) => {
        return new Subscribe({ user_id: userId, suser_id: suserId }).save(null, { method: 'insert' }).then(async (model) => {
            return model
        })
    },
    deleteSubscribe: async (id) => {
        return new Subscribe({ id }).destroy().then((model) => {
            return model
        })
    },
    judgeSubscribe: async (userId, suserId) => {
        return new Subscribe({ user_id: userId, suser_id: suserId }).fetch().then((model) => {
            return model
        })
    },
    getSubScribeCount: async (suserId) => {
        return new Subscribe({ suser_id: suserId }).count().then((count) => {
            return count
        })
    }
}) as any
/**
 * `id` int(11) NOT NULL AUTO_INCREMENT,
 * `user_id` int(11) DEFAULT NULL,
 * `suser_id` int(11) DEFAULT NULL,
 * `create_at` timestamp NULL DEFAULT NULL,
 * `update_at` timestamp NULL DEFAULT NULL,
 * PRIMARY KEY (`id`)
 */
