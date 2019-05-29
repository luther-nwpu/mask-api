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
router.prefix('/api/subscribe');
router.get('/getAllSubscribeByMe', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const userId = ctx.state['$user'].data;
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        resolve(yield _models_1.Subscribe.getAllSubscribeByUserId(userId));
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result };
}));
router.post('/subscribeUser', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const userId = ctx.state['$user'].data;
    const body = ctx.request.body;
    const { suserId } = body;
    if (userId === suserId) {
        return ctx.body = { success: false, result: '不可订阅自己' };
    }
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        resolve(yield _models_1.Subscribe.subscribeUser(userId, suserId));
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result };
}));
router.post('/unSubscribeUser', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const { subscriberId } = ctx.request.body;
    const userId = ctx.state['$user'].data;
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        yield _models_1.Subscribe.deleteSubscribe(subscriberId);
        resolve(yield _models_1.Subscribe.getAllSubscribeByUserId(userId));
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result };
}));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9zdWJzY3JpYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdDQUF1QztBQUN2QyxxQ0FBcUM7QUFDckMscUNBQW1DO0FBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUE7QUFFOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRS9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsQ0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDbkQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFDdEMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLGVBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6RSxPQUFPLENBQUMsTUFBTSxtQkFBUyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDNUQsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0lBQ0gsSUFBSSxLQUFLLEVBQUU7UUFDUCxPQUFPLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQTtLQUN0RDtJQUNELE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUE7QUFDL0MsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDOUMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFDdEMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDN0IsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtJQUN4QixJQUFJLE1BQU0sS0FBSyxPQUFPLEVBQUU7UUFDcEIsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUE7S0FDekQ7SUFDRCxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sZUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pFLE9BQU8sQ0FBQyxNQUFNLG1CQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQzNELENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUNILElBQUksS0FBSyxFQUFFO1FBQ1AsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUE7S0FDdEQ7SUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFBO0FBQy9DLENBQUMsQ0FBQSxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ2hELE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUN6QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUN0QyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sZUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pFLE1BQU0sbUJBQVMsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDN0MsT0FBTyxDQUFDLE1BQU0sbUJBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQzVELENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUNILElBQUksS0FBSyxFQUFFO1FBQ1AsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUE7S0FDdEQ7SUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFBO0FBQy9DLENBQUMsQ0FBQSxDQUFDLENBQUE7QUFFRixrQkFBZSxNQUFNLENBQUEifQ==