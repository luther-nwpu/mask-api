import db from '@libs/db'
import uuid = require('uuid')
export const Barrage = db.Model.extend({
    tableName: 'barrages',
    hasTimestamps: ['create_at', 'update_at']
}, {
    saveBarrage: async (userId, text, videoId, videoTime, fontColor, fontSize) => {
        return new Barrage({ key: uuid.v4(), video_id: videoId, user_id: userId, text: text, video_time: videoTime, font_color: fontColor, font_size: fontSize }).save(null, { method: 'insert' }).then(async (model) => {
            return model
        })
    }
}) as any
/**
 * `id` int(11) NOT NULL,
 * `key` varchar(45) DEFAULT NULL,
 * `text` varchar(45) DEFAULT NULL,
 * `font_size` varchar(45) DEFAULT NULL,
 * `font_color` varchar(45) DEFAULT NULL,
 * `video_id` int(11) DEFAULT NULL,
 * `video_time` varchar(45) DEFAULT NULL,
 * `create_at` timestamp NULL DEFAULT NULL,
 * `update_at` timestamp NULL DEFAULT NULL,
 */
