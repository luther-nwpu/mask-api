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

router.post('/subscribeUser', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const body = ctx.request.body
    const { suserId } = body
    if (userId === suserId) {
        return ctx.body = { success: false, result: '不可订阅自己' }
    }
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await Subscribe.subscribeUser(userId, suserId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

router.post('/unSubscribeUser', async (ctx, next) => {
    const { subscriberId } = ctx.request.body
    const userId = ctx.state['$user'].data
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        await Subscribe.deleteSubscribe(subscriberId)
        resolve(await Subscribe.getAllSubscribeByUserId(userId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

export default router
