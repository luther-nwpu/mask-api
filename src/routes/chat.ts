import * as koaRouter from 'koa-router'
import { tryCatch } from '@libs/util'
import { Chat } from '@models'
const router = new koaRouter()

router.prefix('/api/chat')

router.get('/getAllChatByMe', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await Chat.getChatByUser(userId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: { allMessage: result, myId: userId } }
})

router.get('/readMyChat', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await Chat.readMyChat(userId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: { allMessage: result, myId: userId } }
})

export default router
