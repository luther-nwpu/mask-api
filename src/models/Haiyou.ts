import db from '@libs/db'
import { Picture } from '@models'
export const Haiyou = db.Model.extend({
    tableName: 'haiyous',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(Picture, 'picture_id', 'id')
    }
}, {
    getHaiyou: async (id) => {
        return new Haiyou({ id }).fetch().then((result) => {
            return result
        })
    }
}) as any
/**
 * `id` int(11) NOT NULL AUTO_INCREMENT,
 * `video_id` varchar(45) DEFAULT NULL,
 * `picture_id` varchar(45) DEFAULT NULL,
 * `create_at` timestamp NULL DEFAULT NULL,
 * `update_at` timestamp NULL DEFAULT NULL,
 * `title` varchar(45) DEFAULT NULL,
 * `type` tinyint(4) DEFAULT NULL,
 * `reprint` varchar(45) DEFAULT NULL,
 * `partition` varchar(45) DEFAULT NULL,
 * `label` varchar(45) DEFAULT NULL,
 * `description` varchar(45) DEFAULT NULL,
 * `user_id` int(11) DEFAULT NULL,
 */
