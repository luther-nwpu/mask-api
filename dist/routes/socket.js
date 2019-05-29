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
const redis_1 = require("@libs/redis");
const _config_1 = require("@config");
const jsonwebtoken_1 = require("jsonwebtoken");
const uuid = require("uuid");
const router = new koaRouter();
router.prefix('/api/socket');
router.get('/getTunnelId', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
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
    const tunnelId = uuid.v1();
    redis_1.default.set(`tunnel:${tunnelId}`, payload);
    return ctx.body = { success: true, result: tunnelId };
}));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdDQUF1QztBQUN2Qyx1Q0FBK0I7QUFDL0IscUNBQW9DO0FBQ3BDLCtDQUFxQztBQUNyQyw2QkFBNkI7QUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQTtBQUU5QixNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRTVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzNDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBdUIsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBVyxDQUFBO0lBRWxILElBQUksT0FBTyxDQUFBO0lBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE9BQU8sR0FBRyxDQUFDLENBQUE7S0FDZDtJQUNELElBQUk7UUFDQSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUNuRSxPQUFPLEdBQUcscUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLG9CQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUM1RDthQUFNO1lBQ0gsT0FBTyxHQUFHLENBQUMsQ0FBQTtTQUNkO0tBQ0o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sR0FBRyxDQUFDLENBQUE7S0FDZDtJQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQTtJQUMxQixlQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsUUFBUSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDeEMsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUE7QUFDekQsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUVGLGtCQUFlLE1BQU0sQ0FBQSJ9