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
const debug = require("debug");
const jsonwebtoken_1 = require("jsonwebtoken");
function createJwtMiddleware(options) {
    const { secret, bearer = 'jwt', debugNamespace = 'jwt', ignores = [] } = options;
    const log = debug(debugNamespace);
    const errorOutput = 'Token invalid or expired.';
    return function jwtMiddleware(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = ctx.path;
            const method = ctx.method;
            const ifIgnore = ignores.some(con => {
                const conArr = con.split(':');
                if (conArr.length === 2) {
                    return conArr[0].toLowerCase() === method.toLowerCase() && (path.startsWith(conArr[1]) || new RegExp(conArr[1]).test(path));
                }
                else {
                    return con === path;
                }
            });
            if (!ifIgnore) {
                const token = ctx.header.authorization || decodeURIComponent(ctx.cookies.get('Authorization'));
                if (!token) {
                    log('There is not token provided in header');
                    return ctx.throw(401, errorOutput);
                }
                let payload;
                try {
                    if (token.split(' ').length === 2 && token.split(' ')[0] === 'Bearer') {
                        payload = jsonwebtoken_1.verify(token.split(' ')[1], secret);
                    }
                    else {
                        throw new Error();
                    }
                }
                catch (e) {
                    log('Token verify failed', e);
                    return ctx.throw(401, errorOutput);
                }
                if (payload) {
                    ctx.state[bearer] = payload;
                    return next();
                }
                else {
                    log('Empty payload: ', payload);
                    return ctx.throw(401, errorOutput);
                }
            }
            else {
                return next();
            }
        });
    };
}
exports.default = createJwtMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYnMvand0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBOEI7QUFDOUIsK0NBQXFDO0FBZ0NyQyw2QkFBNkMsT0FBNkI7SUFDdEUsTUFBTSxFQUNGLE1BQU0sRUFDTixNQUFNLEdBQUcsS0FBSyxFQUNkLGNBQWMsR0FBRyxLQUFLLEVBQ3RCLE9BQU8sR0FBRyxFQUFFLEVBQ2YsR0FBRyxPQUFPLENBQUE7SUFDWCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDakMsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLENBQUE7SUFFL0MsT0FBTyx1QkFBOEIsR0FBRyxFQUFFLElBQUk7O1lBQzFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFjLENBQUE7WUFDL0IsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtZQUd6QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUVoQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUM3QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNyQixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2lCQUM5SDtxQkFBTTtvQkFDSCxPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUE7aUJBQ3RCO1lBQ0wsQ0FBQyxDQUFDLENBQUE7WUFFRixJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNYLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBdUIsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBVyxDQUFBO2dCQUVsSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO29CQUM1QyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFBO2lCQUNyQztnQkFFRCxJQUFJLE9BQU8sQ0FBQTtnQkFDWCxJQUFJO29CQUNBLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO3dCQUNuRSxPQUFPLEdBQUcscUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO3FCQUNoRDt5QkFBTTt3QkFDSCxNQUFNLElBQUksS0FBSyxFQUFFLENBQUE7cUJBQ3BCO2lCQUNKO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNSLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDN0IsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQTtpQkFDckM7Z0JBRUQsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUE7b0JBQzNCLE9BQU8sSUFBSSxFQUFFLENBQUE7aUJBQ2hCO3FCQUFNO29CQUNILEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQTtvQkFDL0IsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQTtpQkFDckM7YUFDSjtpQkFBTTtnQkFDSCxPQUFPLElBQUksRUFBRSxDQUFBO2FBQ2hCO1FBQ0wsQ0FBQztLQUFBLENBQUE7QUFDTCxDQUFDO0FBeERELHNDQXdEQyJ9