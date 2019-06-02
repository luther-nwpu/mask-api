import * as koaRouter from 'koa-router'
import { User } from '@models'
import redis from '@libs/redis'
import { tryCatch, sha256, signForToken } from '@libs/util'
import { sendEmail } from '@libs/email'
const router = new koaRouter()

router.prefix('/api/auth')

router.post('/login', async (ctx, next) => {
    const body = ctx.request.body
    const email = body.email
    const password = sha256(body.password)
    const [res, error] = await tryCatch(new Promise((resolve, reject) => {
        new User({ email, password }).fetch({ withRelated: ['picture'] }).then((result) => {
            result ? resolve(JSON.parse(JSON.stringify(result))) : resolve(null)
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    if (res) {
        const userinfo = {
            username: res['username'],
            email: res['email'],
            location: res['location'],
            signature: res['signature'],
            picture_url:  res['picture'] && res['picture']['url'],
            sex: res['sex'],
            age: res['age'],
            telephone: res['telephone']
        }
        return ctx.body = { success: true, result: { token: signForToken(res['id']), userinfo: userinfo } }
    }
    return ctx.body = { success: false, result: { message: '没有该用户' } }
})

router.post('/register', async (ctx, next) => {
    const body = ctx.request.body
    const email = body.email
    const checkcode = body.checkcode
    const [res, error] = await tryCatch(new Promise((resolve, reject) => {
        redis.get(email, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    }))
    if (error || res !== checkcode) {
        return ctx.body = { success: false, result: { id: 'register-checkcode', message: '验证码无效' } }
    }
    const [res0, error0] = await tryCatch(new Promise((resolve, reject) => {
        new User({ email: email }).fetch().then((result) => {
            if (result) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }))
    const password = sha256(body.password)
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    if (res0) {
        return ctx.body = { success: false, result: { id: 'register-username', message: '用户已经注册' } }
    }
    const [res2, error2] = await tryCatch(new Promise((resolve, reject) => {
        new User({ email: email, password: password, username: '好嗨哟' }).save().then((model) => {
            resolve(model)
        })
    }))
    if (error2) {
        throw new Error('内部服务器错误')
    }
    return ctx.body = { success: true, result: { message: '成功' } }
})

router.get('/test', async (ctx, next) => {
    return ctx.body = { success: true }
})

router.post('/sendEmail', async (ctx, next) => {
    const body = ctx.request.body
    await sendEmail(body.email)
    return ctx.body = { success: true }
})

router.post('/updateNickName', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const nickName = ctx.request.body.nickName
    const [res, error] = await tryCatch(new Promise((resolve, reject) => {
        new User({ id: userId, username: nickName }).save(null, { mode: 'update' }).then(async (result) => {
            resolve(await User.getUser(userId))
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    if (res) {
        const userinfo = {
            username: res['username'],
            email: res['email'],
            location: res['location'],
            signature: res['signature'],
            picture_url:  res['picture'] && res['picture']['url'],
            sex: res['sex'],
            age: res['age'],
            telephone: res['telephone']
        }
        return ctx.body = { success: true, result: { userinfo: userinfo } }
    }
    return ctx.body = { success: false, result: { message: '未知错误' } }
})

router.post('/updateUserInfo', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const { location, age, sex, signature } = ctx.request.body

    const [res, error] = await tryCatch(new Promise((resolve, reject) => {
        new User({ id: userId, location, age, sex, signature }).save(null, { mode: 'update' }).then(async (result) => {
            resolve(await User.getUser(userId))
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    if (res) {
        const userinfo = {
            username: res['username'],
            email: res['email'],
            location: res['location'],
            signature: res['signature'],
            picture_url:  res['picture'] && res['picture']['url'],
            sex: res['sex'],
            age: res['age'],
            telephone: res['telephone']
        }
        return ctx.body = { success: true, result: { userinfo: userinfo } }
    }
    return ctx.body = { success: false, result: { message: '未知错误' } }
})

router.post('/updateAvator', async (ctx, next) => {
    const userId = ctx.state['$user'].data
    const avatorId = ctx.request.body.avatorId
    const [res, error] = await tryCatch(new Promise((resolve, reject) => {
        new User({ id: userId, picture_id: avatorId }).save(null, { mode: 'update' }).then(async (result) => {
            resolve(await User.getUser(userId))
        })
    }))
    if (error) {
        return ctx.body = { success: false, result: error }
    }
    if (res) {
        const userinfo = {
            username: res['username'],
            email: res['email'],
            location: res['location'],
            signature: res['signature'],
            avator: res['picture'] && res['picture']['url'],
            sex: res['sex'],
            age: res['age'],
            telephone: res['telephone']
        }
        return ctx.body = { success: true, result: { userinfo: userinfo } }
    }
    return ctx.body = { success: false, result: { message: '未知错误' } }
})

export default router
