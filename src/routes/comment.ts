import * as koaRouter from 'koa-router'
import { tryCatch } from '@libs/util'
import { Comment, SubComment } from '@models'
const router = new koaRouter()

router.prefix('/api/comment')

router.get('/getAllCommentsByHaiyouId', async (ctx, next) => {
    const haiyouId = ctx.request.query.id
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await Comment.getCommentByHaiyouId(haiyouId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

router.post('/sendComment', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const body = ctx.request.body
    const { content, haiyouId } = body
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await Comment.saveComment(content, userId, haiyouId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

router.post('/sendSubComment', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const body = ctx.request.body
    const { commentId, content, haiyouId, suserId } = body
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        resolve(await SubComment.saveSubComment(commentId, content, userId, suserId, haiyouId))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

export default router
