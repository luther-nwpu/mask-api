import db from '@libs/db'
import { SubComment, User } from '@models'
export const Comment = db.Model.extend({
    tableName: 'comments',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getCommentByHaiyouId: async (haiyouId) => {
        return new Comment().where('haiyou_id', haiyouId).orderBy('create_at').fetchAll().then((result) => {
            return Promise.all(result.map(async (value) => {
                const subComments = await SubComment.getAllSubCommentsByMainComment(value.get('id'))
                const user = await User.getUser(value.get('user_id'))
                return { user, subComments, ...(value.toJSON()) }
            }))
        })
    },
    saveComment: async (content, uid, haiyouId) => {
        return new Comment({ content, user_id: uid, haiyou_id: haiyouId }).save(null, { method: 'insert' }).then(async (model) => {
            return Comment.getCommentByHaiyouId(haiyouId)
        })
    }
}) as any
/**
 * `id` int(11) NOT NULL,
 * `content` text,
 * `user_id` int(11) DEFAULT NULL,
 * `CREATE_AT` varchar(45) DEFAULT NULL,
 * `update_at` varchar(45) DEFAULT NULL,
 * `support` text,
 * `haiyou_id` id
 * PRIMARY KEY (`id`)
 */
