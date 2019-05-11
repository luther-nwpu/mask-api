import * as koaRouter from 'koa-router'
import { tryCatch } from '@libs/util'
import { Draft, Haiyou, Video, User } from '@models'
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
    const userId = ctx.request.query.userId
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

router.get('/getHaiyouById', async (ctx, next) => {
    const haiyouId = ctx.request.query.haiyouId
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        new Haiyou({ id: haiyouId }).fetch({ withRelated: ['picture'] }).then(async (result) => {
            result.set('videoArr', await result.get('video_id').split('_').reduce(async (total, value) => {
                total.push(await Video.getVideo(value))
                return total
            }, []))
            result.set('user', await User.getUser(result.get('user_id')))
            resolve(result)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

export default router
