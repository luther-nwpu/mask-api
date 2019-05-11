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
const util_1 = require("@libs/util");
const http_errors_1 = require("http-errors");
function errorCatcher(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const [, err] = yield util_1.tryCatch(next());
        if (err instanceof http_errors_1.HttpError) {
            ctx.status = err.statusCode;
            ctx.body = {
                message: err.message
            };
            return;
        }
        if (err) {
            console.error(err);
            ctx.status = 500;
            ctx.body = {
                message: err.message
            };
        }
    });
}
exports.errorCatcher = errorCatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JDYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL2Vycm9yQ2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBRXJDLDZDQUF1QztBQUV2QyxzQkFBb0MsR0FBWSxFQUFFLElBQWM7O1FBQzVELE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sZUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFFdEMsSUFBSSxHQUFHLFlBQVksdUJBQVMsRUFBRTtZQUMxQixHQUFHLENBQUMsTUFBTSxHQUFJLEdBQWlCLENBQUMsVUFBVSxDQUFBO1lBQzFDLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1AsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2FBQ3ZCLENBQUE7WUFFRCxPQUFNO1NBQ1Q7UUFFRCxJQUFJLEdBQUcsRUFBRTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFFbEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7WUFDaEIsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDUCxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87YUFDdkIsQ0FBQTtTQUNKO0lBQ0wsQ0FBQztDQUFBO0FBcEJELG9DQW9CQyJ9