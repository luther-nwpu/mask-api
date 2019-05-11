import db from '@libs/db'
import { Picture } from '@models'
export const Article = db.Model.extend({
    tableName: 'articles',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(Picture, 'picture_id', 'picture_id')
    }
}) as typeof db.Model
/**
 * `article_id` int(11) NOT NULL AUTO_INCREMENT,
 * `description` text,
 * `content` text,
 * `picture_id` int(11) DEFAULT NULL,
 * `title` varchar(45) DEFAULT NULL,
 * `update_at` timestamp(6) NULL DEFAULT NULL,
 * `create_at` timestamp(6) NULL DEFAULT NULL,
 */
