import db from '@libs/db'
import * as Promise from 'bluebird'

export const Picture = db.Model.extend({
    tableName: 'picture',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getPicture: Promise.method((id) => {
        return new Picture().query('where', 'id', '=', id).fetch().then((picture) => {
            return picture.toJSON()
        })
    }),
    savePicture: Promise.method((pictureInfo) => {
        return new Picture(pictureInfo).save(null, { method: 'insert' }).then(model => {
            return model
        })
    })
}) as any
/**
 * `id` int(11) NOT NULL AUTO_INCREMENT,
 * `name` varchar(45) DEFAULT NULL,
 * `description` varchar(45) DEFAULT NULL,
 * `create_at` timestamp(6) NULL DEFAULT NULL,
 * `update_at` timestamp(6) NULL DEFAULT NULL,
 * `url` varchar(45) DEFAULT NULL,
 */
