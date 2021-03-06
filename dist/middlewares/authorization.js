"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@libs/jwt");
const _config_1 = require("@config");
exports.jwtMiddleware = [
    jwt_1.default({
        secret: _config_1.JWT_SECRET,
        bearer: '$user',
        debugNamespace: _config_1.DEBUG_NAMESPACE.JWT,
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
    function (ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return next();
        });
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9hdXRob3JpemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMkM7QUFDM0MscUNBQXFEO0FBRXhDLFFBQUEsYUFBYSxHQUFHO0lBQ3pCLGFBQW1CLENBQUM7UUFDaEIsTUFBTSxFQUFFLG9CQUFVO1FBQ2xCLE1BQU0sRUFBRSxPQUFPO1FBQ2YsY0FBYyxFQUFFLHlCQUFlLENBQUMsR0FBRztRQUNuQyxPQUFPLEVBQUU7WUFDTCxvQkFBb0I7WUFDcEIsb0JBQW9CO1lBQ3BCLHNCQUFzQjtZQUN0QixxQkFBcUI7WUFDckIsa0JBQWtCO1lBQ2xCLDJCQUEyQjtZQUMzQix3QkFBd0I7WUFDeEIseUJBQXlCO1lBQ3pCLDZDQUE2QztZQUM3Qyw2QkFBNkI7WUFDN0IseUJBQXlCO1lBQ3pCLDJCQUEyQjtZQUMzQixrQ0FBa0M7WUFDbEMsdUNBQXVDO1lBQ3ZDLDhCQUE4QjtZQUM5QixxQ0FBcUM7U0FDeEM7S0FDSixDQUFDO0lBS0YsVUFBZ0IsR0FBRyxFQUFFLElBQUk7O1lBQ3JCLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDakIsQ0FBQztLQUFBO0NBQ0osQ0FBQSJ9