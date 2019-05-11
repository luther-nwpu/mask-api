import * as koaRouter from 'koa-router'
import * as fs from 'fs'
import { mkdirsSync, tryCatch } from '@libs/util'
import { Picture, Article } from '@models'
const router = new koaRouter()

router.prefix('/api/admin')

router.post('/upload', async (ctx, next) => {
    const [result, error] = await tryCatch(new Promise((resovle: Function, reject: Function) => {
        mkdirsSync('upload/')
        const file = ctx.request.files.file
        const reader = fs.createReadStream(file.path)
        const fileNameArr = file.name.split('.')
        const ext = fileNameArr.pop()
        const oldFileName = fileNameArr.join()
        const newFileName = `${oldFileName}_${new Date().getTime()}`
        const newFileUrl = `upload/${newFileName}.${ext}`
        const upStream = fs.createWriteStream(newFileUrl)
        reader.pipe(upStream)
        new Picture({ name: oldFileName, picture_url: newFileUrl }).save(null, { method: 'insert' }).then(model => {
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

router.post('/commitArticle', async (ctx, next) => {
    const body = JSON.parse(ctx.request.body)
    const [result, error] = await tryCatch(new Promise((resolve, reject) => {
        new Article({ description: body.description, picture_id: body.img, title: body.title, content: JSON.stringify(body.content) }).save(null, { method: 'insert' }).then(model => {
            resolve(model)
        }).catch(err => {
            reject(err)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: result }
})

router.post('/editArticle', async (ctx, next) => {
    const body = JSON.parse(ctx.request.body)
    console.log(body)
    const [result, error] = await tryCatch(new Promise((resolve, reject) => {
        new Article()
            .where({ article_id: body.article_id })
            .save({ description: body.description, picture_id: body.img, title: body.title, content: JSON.stringify(body.content) }, { method: 'update' })
            .then(model => {
                resolve(model)
            }).catch(err => {
                reject(err)
            })
    }))
    console.log(error)
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: result }
})
export default router
