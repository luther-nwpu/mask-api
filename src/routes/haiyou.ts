import * as koaRouter from 'koa-router'
import { tryCatch } from '@libs/util'
import { Draft, Haiyou, Video, User, Subscribe, History, Picture } from '@models'
import { JWT_SECRET } from '@config'
import { verify } from 'jsonwebtoken'
const router = new koaRouter()

router.prefix('/api/haiyou')

router.post('/commitHaiyou', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const { video_id, picture_id, title, type, reprint, partition, label, description, draft_id } = ctx.request.body
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        new Haiyou({ video_id, picture_id, title, type, reprint, partition, label, description, user_id: userId }).save(null, { method: 'insert' }).then((model) => {
            resolve(model)
        })
    }))
    new Draft({ id: draft_id }).destroy()
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: result }
})

router.post('/updateHaiyou', async (ctx, next) => {
    const { id, spare_picture, video_id, picture_id, title, type, reprint, partition, label, description, draft_id } = ctx.request.body
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        new Haiyou({ id, spare_picture, video_id, picture_id, title, type, reprint, partition, label, description }).save(null, { method:  'update' }).then((model) => {
            resolve(model)
        })
    }))
    new Draft({ id: draft_id }).destroy()
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: result }
})

router.post('/deleteHaiyou', async (ctx, next) => {
    const { id } = ctx.request.body
    const [result, error] = await tryCatch(new Promise(async (resovle: Function, reject: Function) => {
        new Haiyou({ id }).destroy().then((model) => {
            resovle(model)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: result }
})

router.get('/getAllHaiyou', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        new Haiyou().where({ user_id: parseInt(userId, 10) }).fetchAll({ withRelated: ['picture'] }).then((result) => {
            resolve(result)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

router.get('/getAllHaiyouByUserId', async (ctx, next) => {
    const token = ctx.header.authorization as string || decodeURIComponent(ctx.cookies.get('Authorization')) as string
    // token invalid
    let payload
    if (!token) {
        payload = 0
    }
    try {
        if (token.split(' ').length === 2 && token.split(' ')[0] === 'Bearer') {
            payload = verify(token.split(' ')[1], JWT_SECRET)['data']
        } else {
            payload = 0
        }
    } catch (e) {
        payload = 0
    }
    const userId = ctx.request.query.userId
    const [haiyous, error] = await tryCatch(new Promise(async (resolve, reject) => {
        new Haiyou().where({ user_id: parseInt(userId, 10) }).fetchAll({ withRelated: ['picture'] }).then((result) => {
            resolve(result)
        })
    }))
    const [subscribe, error1] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await Subscribe.judgeSubscribe(payload, userId))
    }))
    const [user, error2] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await User.getUser(userId))
    }))
    if (error && error1 && error2) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: { haiyous, subscribe, user } }
})

router.get('/getHaiyouById', async (ctx, next) => {
    const token = ctx.header.authorization as string || decodeURIComponent(ctx.cookies.get('Authorization')) as string
    // token invalid
    let payload
    if (!token) {
        payload = 0
    }
    try {
        if (token.split(' ').length === 2 && token.split(' ')[0] === 'Bearer') {
            payload = verify(token.split(' ')[1], JWT_SECRET)['data']
        } else {
            payload = 0
        }
    } catch (e) {
        payload = 0
    }
    const haiyouId = ctx.request.query.haiyouId
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        new Haiyou({ id: haiyouId }).fetch({ withRelated: ['picture'] }).then(async (result) => {
            if (payload !== 0) {
                History.saveHistory(payload, haiyouId)
            }
            result.save('hot', result.get('hot') + 1)
            resolve({videoArr: await result.get('video_id').split('_').reduce(async (total, currentValue) => {
                const accumulator = await total
                accumulator.push(await Video.getVideo(parseInt(currentValue, 10)))
                return Promise.resolve(accumulator)
            }, Promise.resolve([])), pictureResult: await (result.get('spare_picture') ? result.get('spare_picture').split('_') : []).reduce(async (total, currentValue) => {
                const accumulator = await total
                accumulator.push(await Picture.getPicture(parseInt(currentValue, 10)))
                return Promise.resolve(accumulator)
            }, Promise.resolve([])), subscribe: await Subscribe.judgeSubscribe(payload, result.get('user_id')), followNum: await Subscribe.getSubScribeCount(result.get('user_id')), user: await User.getUser(result.get('user_id')), ...result.toJSON()})
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

export default router
