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
const _models_1 = require("@models");
const util_1 = require("@libs/util");
const _websocket_1 = require("@websocket");
const router = new koaRouter();
router.prefix('/api/barrage');
router.get('/getAllBarrageByVideoId', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const videoId = ctx.request.query.videoId;
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        new _models_1.Barrage().where({ video_id: parseInt(videoId, 10) }).fetchAll().then((result) => {
            resolve(result);
        });
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result };
}));
router.post('/sendBarrage', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const userId = ctx.request.query.userId;
    const { video_id, key, text, font_size, color, time, video_time } = ctx.request.body;
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        new _models_1.Barrage({ video_id, key, text, font_size, color, video_time, time, user_id: userId }).save(null, { method: 'insert' }).then(model => {
            resolve(result);
        });
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    _websocket_1.default().broadcast([`tunnelId:${video_id}`], {
        action: 'acceptSocket',
        payload: result
    });
    return ctx.body = { success: true, result };
}));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFycmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYmFycmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsd0NBQXVDO0FBQ3ZDLHFDQUFpQztBQUNqQyxxQ0FBcUM7QUFDckMsMkNBQWtDO0FBRWxDLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUE7QUFFOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUU3QixNQUFNLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLENBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3RELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQTtJQUN6QyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sZUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pFLElBQUksaUJBQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNoRixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7SUFDSCxJQUFJLEtBQUssRUFBRTtRQUNQLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBO0tBQ3REO0lBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQTtBQUMvQyxDQUFDLENBQUEsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDNUMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBQ3ZDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUNwRixNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sZUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pFLElBQUksaUJBQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUNILElBQUksS0FBSyxFQUFFO1FBQ1AsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUE7S0FDdEQ7SUFDRCxvQkFBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxRQUFRLEVBQUUsQ0FBQyxFQUFFO1FBQzVDLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUMsQ0FBQTtJQUVGLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUE7QUFDL0MsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUVGLGtCQUFlLE1BQU0sQ0FBQSJ9