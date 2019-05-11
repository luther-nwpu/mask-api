"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("@websocket/socket");
let instance = null;
function default_1(opts = {}) {
    if (!instance) {
        instance = new socket_1.default(opts);
    }
    return instance;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd2Vic29ja2V0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQXlDO0FBRXpDLElBQUksUUFBUSxHQUFjLElBQUksQ0FBQTtBQUU5QixtQkFBeUIsSUFBSSxHQUFHLEVBQUU7SUFDOUIsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNYLFFBQVEsR0FBRyxJQUFJLGdCQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDakM7SUFFRCxPQUFPLFFBQVEsQ0FBQTtBQUNuQixDQUFDO0FBTkQsNEJBTUMifQ==