import * as koaRouter from 'koa-router'
import { Picture, Article } from '@models'
import * as fs from 'fs'
import { mkdirsSync, tryCatch, readImg } from '@libs/util'

const router = new koaRouter()

router.prefix('/api/common')

router.get('/getAllArticles', async (ctx, next) => {
    const [articles, error] = await tryCatch(new Promise((resolve, reject) => {
        new Article().fetchAll({ withRelated: ['picture'] }).then(function (results) {
            resolve(results)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: articles }
})

router.post('/uploadImg', async (ctx, next) => {
    const [result, error] = await tryCatch(new Promise((resovle: Function, reject: Function) => {
        mkdirsSync('upload/img/')
        const file = ctx.request.files.file
        const reader = fs.createReadStream(file.path)
        const fileNameArr = file.name.split('.')
        const ext = fileNameArr.pop()
        const oldFileName = fileNameArr.join()
        const newFileName = `${oldFileName}_${new Date().getTime()}`
        const newFileUrl = `upload/img/${newFileName}.${ext}`
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

router.post('/uploadVideo', async (ctx, next) => {
    const [result, error] = await tryCatch(new Promise((resovle: Function, reject: Function) => {
        mkdirsSync('upload/img/')
        const file = ctx.request.files.file
        const reader = fs.createReadStream(file.path)
        const fileNameArr = file.name.split('.')
        const ext = fileNameArr.pop()
        const oldFileName = fileNameArr.join()
        const newFileName = `${oldFileName}_${new Date().getTime()}`
        const newFileUrl = `upload/img/${newFileName}.${ext}`
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

router.post('/getArticleById', async (ctx, next) => {
    const body = JSON.parse(ctx.request.body)
    console.log(body.article_id)
    const [article, error] = await tryCatch(new Promise((resolve, reject) => {
        new Article({ article_id: body.article_id }).fetch({ withRelated: ['picture'] }).then((result) => {
            resolve(result)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: article }
})

// router.get('/img', async (ctx, next) => {
//     let { imgName } = ctx.request.query
//     const res = await readImg(imgName)
//     if (res) {
//         ctx.type = 'jpg'
//         ctx.body = res
//     }
//     await next()
// })

export default router
