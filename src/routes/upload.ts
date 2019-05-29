import * as koaRouter from 'koa-router'
import * as fs from 'fs'
import { mkdirsSync, tryCatch } from '@libs/util'
import { Video, Picture, Draft } from '@models'
import { returnVideoImg } from '@libs/ffmpeg'
const router = new koaRouter()

router.prefix('/api/upload')

router.post('/video', async (ctx, next) => {
    const [result, error] = await tryCatch(new Promise(async (resovle: Function, reject: Function) => {
        mkdirsSync('/static/video/')
        const file = ctx.request.files.file
        const reader = fs.createReadStream(file.path)
        const fileNameArr = file.name.split('.')
        const ext = fileNameArr.pop()
        const oldFileName = fileNameArr.join()
        const newFileName = `${oldFileName}_${new Date().getTime()}`
        const newFileUrl = `/static/video/${newFileName}.${ext}`
        const upStream = fs.createWriteStream(newFileUrl)
        reader.pipe(upStream)
        new Video({ name: oldFileName, url: newFileUrl }).save(null, { method: 'insert' }).then(model => {
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

router.post('/firstvideo', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const [result, error] = await tryCatch(new Promise(async (resolve: Function, reject: Function) => {
        mkdirsSync('/static/video/')
        const file = ctx.request.files.file
        const reader = fs.createReadStream(file.path)
        const fileNameArr = file.name.split('.')
        const ext = fileNameArr.pop()
        const oldFileName = fileNameArr.join()
        const newFileName = `${oldFileName}_${new Date().getTime()}`
        const newFileUrl = `/static/video/${newFileName}.${ext}`
        const upStream = fs.createWriteStream(newFileUrl)
        reader.pipe(upStream)
        const imgs: any = await new Promise(async (resolve, reject) => {
            reader.on('end', async () => {
                resolve(await returnVideoImg(newFileUrl))
            })
        })
        const imgArr = []
        const imgIndex = []
        for (let item of imgs) {
            const newPicture = await Picture.savePicture({ name: item, url: item, user_id: userId })
            imgArr.push(newPicture)
            imgIndex.push(newPicture.id)
        }
        const uploadVideo: any = await new Promise(async (resolve, reject) => {
            new Video({ name: oldFileName, url: newFileUrl }).save(null, { method: 'insert' }).then(model => {
                resolve(model)
            }).catch(err => {
                reject(err)
            })
        })
        new Draft({ video_id: uploadVideo.id, user_id: userId, picture_id: imgIndex.join('_') }).save(null, { method: 'insert' }).then(draft => {
            resolve({ draft, uploadVideo, imgArr })
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    return ctx.body = { success: true, result: result }
})

router.post('/uploadImg', async (ctx, next) => {
    const [result, error] = await tryCatch(new Promise((resovle: Function, reject: Function) => {
        mkdirsSync('/static/picture/')
        const file = ctx.request.files.file
        const reader = fs.createReadStream(file.path)
        const fileNameArr = file.name.split('.')
        const ext = fileNameArr.pop()
        const oldFileName = fileNameArr.join()
        const newFileName = `${oldFileName}_${new Date().getTime()}`
        const newFileUrl = `/static/picture/${newFileName}.${ext}`
        const upStream = fs.createWriteStream(newFileUrl)
        reader.pipe(upStream)
        new Picture({ name: oldFileName, url: newFileUrl }).save(null, { method: 'insert' }).then(model => {
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

export default router
