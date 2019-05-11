import * as koaRouter from 'koa-router'
import { tryCatch } from '@libs/util'
import { Video } from '@models'
const router = new koaRouter()

router.prefix('/api/video')

router.get('/getVideoByVideoId', async (ctx, next) => {
    const videoId = ctx.request.query.videoId
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await Video.getVideo(videoId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: result }
})

export default router
