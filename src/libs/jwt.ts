import * as debug from 'debug'
import { verify } from 'jsonwebtoken'

export interface JwtMiddlewareOptions {

    /**
     * secret key
     */
    secret: string

    /**
     * bear userinfo comes from jwt on ctx
     */
    bearer?: string

    /**
     * debug namespace
     */
    debugNamespace?: string

    /**
     * ignore jwt whitelist
     * {Method}:{Url} for ignore request by method and url exactly
     * or just provide {Url} for any methods' request
     * @example ['POST:/login', '/avatar']
     */
    ignores?: string[]
}

/**
 * create a jwt middleware
 * @param {JwtMiddlewareOptions} options
 */
export default function createJwtMiddleware (options: JwtMiddlewareOptions) {
    const {
        secret,
        bearer = 'jwt',
        debugNamespace = 'jwt',
        ignores = []
    } = options
    const log = debug(debugNamespace)
    const errorOutput = 'Token invalid or expired.'

    return async function jwtMiddleware (ctx, next) {
        const path = ctx.path as string
        const method = ctx.method

        // check if ignore
        const ifIgnore = ignores.some(con => {
            // judge Picture
            const conArr = con.split(':')
            if (conArr.length === 2) {
                return conArr[0].toLowerCase() === method.toLowerCase() && (path.startsWith(conArr[1]) || new RegExp(conArr[1]).test(path)) // add 正则表达
            } else {
                return con === path
            }
        })

        if (!ifIgnore) {
            const token = ctx.header.authorization as string || decodeURIComponent(ctx.cookies.get('Authorization')) as string
            // token invalid
            if (!token) {
                log('There is not token provided in header')
                return ctx.throw(401, errorOutput)
            }

            let payload
            try {
                if (token.split(' ').length === 2 && token.split(' ')[0] === 'Bearer') {
                    payload = verify(token.split(' ')[1], secret)
                } else {
                    throw new Error()
                }
            } catch (e) {
                log('Token verify failed', e)
                return ctx.throw(401, errorOutput)
            }

            if (payload) {
                ctx.state[bearer] = payload
                return next()
            } else {
                log('Empty payload: ', payload)
                return ctx.throw(401, errorOutput)
            }
        } else {
            return next()
        }
    }
}
