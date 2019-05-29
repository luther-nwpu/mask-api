import createJwtMiddleware from '@libs/jwt'
import { DEBUG_NAMESPACE, JWT_SECRET } from '@config'

export const jwtMiddleware = [
    createJwtMiddleware({
        secret: JWT_SECRET,
        bearer: '$user',
        debugNamespace: DEBUG_NAMESPACE.JWT,
        ignores: [
            'POST:/upload/video',
            'POST:/admin/upload',
            'POST:/auth/sendEmail',
            'POST:/auth/register',
            'POST:/auth/login',
            'POST:/admin/commitArticle',
            'POST:/admin/addArticle',
            'POST:/admin/editArticle',
            `GET:^(\\/upload\\/)\\S+(\\.(jpeg|png|jpg))$`,
            'POST:/common/getArticleById',
            'GET:/socket/getTunnelId',
            'GET:/haiyou/getHaiyouById',
            'GET:/haiyou/getAllHaiyouByUserId',
            'GET:/comment/getAllCommentsByHaiyouId',
            'GET:/video/getVideoByVideoId',
            'GET:/barrage/getAllBarrageByVideoId'
        ]
    }),

    /**
     * query user from db
     */
    async function (ctx, next) {
        return next()
    }
]
