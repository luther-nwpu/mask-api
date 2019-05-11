import * as koaRouter from 'koa-router'
import { tryCatch } from '@libs/util'
import { Draft } from '@models'
const router = new koaRouter()

router.prefix('/api/drafts')

router.post('/updateDraft', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const { id, video_id, picture_id, title, type, reprint, partition, label, description, select_picture } = ctx.request.body
    const [result, error] = await tryCatch(new Promise(async (resovle: Function, reject: Function) => {
        new Draft({ id, video_id, title, picture_id, type, reprint, partition, label, description, user_id: userId, select_picture }).save(null, { method: 'update' }).then(model => {
            resovle(model)
        }).catch(err => {
            reject(err)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: result }
})

router.post('/deleteDraft', async (ctx, next) => {
    const { id } = ctx.request.body
    const [result, error] = await tryCatch(new Promise(async (resovle: Function, reject: Function) => {
        new Draft({ id }).destroy().then((model) => {
            resovle(model)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: result }
})

router.get('/getAllDraft', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const [result, error] = await tryCatch(new Promise(async (resolve, reject) => {
        new Draft().where({ user_id: parseInt(userId, 10) }).fetchAll({ withRelated: ['picture'] }).then((result) => {
            resolve(result)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result }
})

router.get('/getDraftById', async (ctx, next) => {
    console.log(ctx.request.query.id)
    const [drafts, error] = await tryCatch(new Promise((resolve, reject) => {
        resolve(new Draft().getDrafts(ctx.request.query.id))
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: drafts }
})

export default router
