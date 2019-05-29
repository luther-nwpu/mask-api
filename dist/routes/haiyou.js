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
const _config_1 = require("@config");
const jsonwebtoken_1 = require("jsonwebtoken");
const router = new koaRouter();
router.prefix('/api/haiyou');
router.post('/commitHaiyou', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const userId = ctx.state['$user'].data;
    const { video_id, picture_id, title, type, reprint, partition, label, description, draft_id } = ctx.request.body;
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        new _models_1.Haiyou({ video_id, picture_id, title, type, reprint, partition, label, description, user_id: userId }).save(null, { method: 'insert' }).then((model) => {
            resolve(model);
        });
    })));
    new _models_1.Draft({ id: draft_id }).destroy();
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result: result };
}));
router.get('/getAllHaiyou', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const userId = ctx.state['$user'].data;
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        new _models_1.Haiyou().where({ user_id: parseInt(userId, 10) }).fetchAll({ withRelated: ['picture'] }).then((result) => {
            resolve(result);
        });
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result };
}));
router.get('/getAllHaiyouByUserId', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const token = ctx.header.authorization || decodeURIComponent(ctx.cookies.get('Authorization'));
    let payload;
    if (!token) {
        payload = 0;
    }
    try {
        if (token.split(' ').length === 2 && token.split(' ')[0] === 'Bearer') {
            payload = jsonwebtoken_1.verify(token.split(' ')[1], _config_1.JWT_SECRET)['data'];
        }
        else {
            payload = 0;
        }
    }
    catch (e) {
        payload = 0;
    }
    const userId = ctx.request.query.userId;
    const [haiyous, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        new _models_1.Haiyou().where({ user_id: parseInt(userId, 10) }).fetchAll({ withRelated: ['picture'] }).then((result) => {
            resolve(result);
        });
    })));
    const [subscribe, error1] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        resolve(yield _models_1.Subscribe.judgeSubscribe(payload, userId));
    })));
    const [user, error2] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        resolve(yield _models_1.User.getUser(userId));
    })));
    if (error && error1 && error2) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result: { haiyous, subscribe, user } };
}));
router.get('/getHaiyouById', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const token = ctx.header.authorization || decodeURIComponent(ctx.cookies.get('Authorization'));
    let payload;
    if (!token) {
        payload = 0;
    }
    try {
        if (token.split(' ').length === 2 && token.split(' ')[0] === 'Bearer') {
            payload = jsonwebtoken_1.verify(token.split(' ')[1], _config_1.JWT_SECRET)['data'];
        }
        else {
            payload = 0;
        }
    }
    catch (e) {
        payload = 0;
    }
    const haiyouId = ctx.request.query.haiyouId;
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        new _models_1.Haiyou({ id: haiyouId }).fetch({ withRelated: ['picture'] }).then((result) => __awaiter(this, void 0, void 0, function* () {
            if (payload !== 0) {
                _models_1.History.saveHistory(payload, haiyouId);
            }
            result.save('hot', result.get('hot') + 1);
            resolve(Object.assign({ videoArr: yield result.get('video_id').split('_').reduce((total, value) => __awaiter(this, void 0, void 0, function* () {
                    total.push(yield _models_1.Video.getVideo(value));
                    return total;
                }), []), subscribe: yield _models_1.Subscribe.judgeSubscribe(payload, result.get('user_id')), followNum: yield _models_1.Subscribe.getSubScribeCount(result.get('user_id')), user: yield _models_1.User.getUser(result.get('user_id')) }, result.toJSON()));
        }));
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result };
}));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFpeW91LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9oYWl5b3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdDQUF1QztBQUN2QyxxQ0FBcUM7QUFDckMscUNBQXdFO0FBQ3hFLHFDQUFvQztBQUNwQywrQ0FBcUM7QUFDckMsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQTtBQUU5QixNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzdDLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBQ3RDLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQ2hILE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxlQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDekUsSUFBSSxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkosT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xC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