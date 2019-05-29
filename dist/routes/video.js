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
const koaRouter = require("koa-router");
const util_1 = require("@libs/util");
const _models_1 = require("@models");
const router = new koaRouter();
router.prefix('/api/video');
router.get('/getVideoByVideoId', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const videoId = ctx.request.query.videoId;
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        resolve(yield _models_1.Video.getVideo(videoId));
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result: result };
}));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL3ZpZGVvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx3Q0FBdUM7QUFDdkMscUNBQXFDO0FBQ3JDLHFDQUErQjtBQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFBO0FBRTlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7QUFFM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNqRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUE7SUFDekMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLGVBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6RSxPQUFPLENBQUMsTUFBTSxlQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDMUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBQ0gsSUFBSSxLQUFLLEVBQUU7UUFDUCxPQUFPLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQTtLQUN0RDtJQUNELE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFBO0FBQ3ZELENBQUMsQ0FBQSxDQUFDLENBQUE7QUFFRixrQkFBZSxNQUFNLENBQUEifQ==