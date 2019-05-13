import * as koaRouter from 'koa-router'
import { tryCatch } from '@libs/util'
import { Subscribe } from '@models'
const router = new koaRouter()

router.prefix('/api/subscribe')

router.get('/getAllSubscribeByMe', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await Subscribe.getAllSubscribeByUserId(userId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

export default router
