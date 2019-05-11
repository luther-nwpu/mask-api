import db from '@libs/db'
import { Picture, Video, User } from '@models'
export const Draft = db.Model.extend({
    tableName: 'drafts',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(Picture, 'select_picture', 'id')
    },
    getDrafts: async (id) => {
        return new Draft().query('where', 'id', '=', id).fetch().then(async (draft) => {
            const videoArr = draft.get('video_id') ? draft.get('video_id').split('_') : []
            const pictureArr = draft.get('picture_id') ? draft.get('picture_id').split('_') : []
            const videoResult = await videoArr.reduce(async (total, currentValue) => {
                const accumulator = await total
                accumulator.push(await Video.getVideo(parseInt(currentValue, 10)))
                return Promise.resolve(accumulator)
            }, Promise.resolve([]))
            const pictureResult = await pictureArr.reduce(async (total, currentValue) => {
                const accumulator = await total
                accumulator.push(await Picture.getPicture(parseInt(currentValue, 10)))
                return Promise.resolve(accumulator)
            }, Promise.resolve([]))
            const userResult = draft.get('user_id') ? await User.getUser(draft.get('user_id')) : null
            return { pictureResult, videoResult, userResult, ...(draft.toJSON()) }
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
