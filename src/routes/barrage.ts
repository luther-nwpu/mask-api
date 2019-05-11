import * as koaRouter from 'koa-router'
import { Barrage } from '@models'
import { tryCatch } from '@libs/util'
import websocket from '@websocket'

const router = new koaRouter()

router.prefix('/api/barrage')

router.get('/getAllBarrageByVideoId', async (ctx, next) => {
    const videoId = ctx.request.query.videoId
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        new Barrage().where({ video_id: parseInt(videoId, 10) }).fetchAll().then((result) => {
            resolve(result)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

router.post('/sendBarrage', async (ctx, next) => {
    const userId = ctx.request.query.userId
    const { video_id, key, text, font_size, color, time, video_time } = ctx.request.body
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        new Barrage({ video_id, key, text, font_size, color, video_time, time, user_id: userId }).save(null, { method: 'insert' }).then(model => {
            resolve(result)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    websocket().broadcast([`tunnelId:${video_id}`], {
        action: 'acceptSocket',
        payload: result
    })

    return ctx.body = { success: true, result }
})

export default router
