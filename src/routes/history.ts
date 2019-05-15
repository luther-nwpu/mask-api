import * as koaRouter from 'koa-router'
import { tryCatch } from '@libs/util'
import { History } from '@models'
const router = new koaRouter()

router.prefix('/api/history')

router.get('/getAllHistoryByMe', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await History.getAllHistoryByUserId(userId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

router.post('/deleteHistoryById', async (ctx, next) => {
    const { id } = ctx.request.body
    const userId = ctx.state['$user'].data
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        await History.deleteHistory(id)
        resolve(await History.getAllHistoryByUserId(userId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

export default router
