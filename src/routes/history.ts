import * as koaRouter from 'koa-router'
import redis from '@libs/redis'
import { JWT_SECRET } from '@config'
import { verify } from 'jsonwebtoken'
import uuid = require('uuid')
const router = new koaRouter()

router.prefix('/api/socket')

router.get('/getTunnelId', async (ctx, next) => {
    const token = ctx.header.authorization as string || decodeURIComponent(ctx.cookies.get('Authorization')) as string
    // token invalid
    let payload
    if (!token) {
        payload = 0
    }
    try {
        if (token.split(' ').length === 2 && token.split(' ')[0] === 'Bearer') {
            payload = verify(token.split(' ')[1], JWT_SECRET)['data']
        } else {
            payload = 0
        }
    } catch (e) {
        payload = 0
    }
    const tunnelId = uuid.v1()
    redis.set(`tunnel:${tunnelId}`, payload)
    return ctx.body = { success: true, result: tunnelId }
})

export default router
