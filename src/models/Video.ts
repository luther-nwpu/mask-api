import db from '@libs/db'
import * as Promise from 'bluebird'

export const Video = db.Model.extend({
    tableName: 'video',
    hasTimestamps: ['create_at', 'update_at'],
}, {
    getVideo: (id) => {
        return new Video().query('where', 'id', '=', id).fetch().then((video) => {
            return video.toJSON()
        })
    }
}) as any
/**
 * `id` INT NOT NULL,
 * `url` VARCHAR(45) NULL,
 * `create_at` VARCHAR(45) NULL,
 * `update_at` VARCHAR(45) NULL,
 * `description` VARCHAR(45) NULL,
 * `name` VARCHAR(45) NULL,
 * `userid` INT NOT NULL
 */
