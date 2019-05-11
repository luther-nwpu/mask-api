import db from '@libs/db'
import { User, Comment } from '@models'
export const SubComment = db.Model.extend({
    tableName: 'subcomments',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getAllSubCommentsByMainComment: async (mainCommentId) => {
        return new SubComment().where('comment_id', mainCommentId).orderBy('create_at').fetchAll().then(result => {
            return Promise.all(result.map(async (value) => {
                const user = await User.getUser(value.get('user_id'))
                const suser = await User.getUser(value.get('suser_id'))
                return { user, suser, ...(value.toJSON()) }
            }))
        })
    },
    saveSubComment: async (mainCommentId, content, userId, suserId, haiyouId) => {
        return new SubComment({ comment_id: mainCommentId, content, user_id: userId, suser_id: suserId }).save(null, { method: 'insert' }).then(async (model) => {
            return Comment.getCommentByHaiyouId(haiyouId)
        })
    }
}) as any
/**
 * `id` int(11) NOT NULL,
 * `comment_id` int(11) DEFAULT NULL,
 * `user_id` int(11) DEFAULT NULL,
 * `suser_id` int(11) DEFAULT NULL,
 * `content` text,
 * `create_at` timestamp NULL DEFAULT NULL,
 * `update_at` timestamp NULL DEFAULT NULL,
 * `support` text,
 * PRIMARY KEY (`id`),
 * KEY `comment_id_idx` (`comment_id`),
 * KEY `user_id_idx` (`user_id`),
 * CONSTRAINT `comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`)
 */
