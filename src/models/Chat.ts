import db from '@libs/db'
import { User } from '@models'
export const Chat = db.Model.extend({
    tableName: 'chat',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getChat: async (id) => {
        return new Chat({ id }).fetch().then(async (result) => {
            const user = await User.getUser(result.get('user_id'))
            const suser = await User.getUser(result.get('suser_id'))
            return { user, suser, ...(result.toJSON()) }
        })
    },
    getChatByUser: async (uid) => {
        return new Chat().query({ where: { user_id: uid }, orWhere: { suser_id: uid } }).fetchAll().then((result) => {
            return Promise.all(result.map(async (value) => {
                const user = await User.getUser(value.get('user_id'))
                const suser = await User.getUser(value.get('suser_id'))
                return { user, suser, ...(value.toJSON()) }
            }))
        })
    },
    readMyChat: async (uid) => {
        return new Chat().query({ where: { user_id: uid }, orWhere: { suser_id: uid } }).fetchAll().then((result) => {
            return Promise.all(result.map(async (value) => {
                const user = await User.getUser(value.get('user_id'))
                const suser = await User.getUser(value.get('suser_id'))
                if (value.get('suser_id') === uid) {
                    await value.save({ is_read: true }, {
                        method: 'update',
                        patch: true
                    })
                }
                return { user, suser, ...(value.toJSON()) }
            }))
        })
    }
}) as any
/**
 * `id` int(11) NOT NULL,
 * `user_id` int(11) DEFAULT NULL,
 * `suser_id` int(11) DEFAULT NULL,
 * `content` varchar(45) DEFAULT NULL,
 * `create_at` timestamp NULL DEFAULT NULL,
 * `update_at` timestamp NULL DEFAULT NULL,
 * `is_read` tinyint(4) DEFAULT NULL,
 * PRIMARY KEY (`id`)
 */
