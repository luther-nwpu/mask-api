"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@libs/db");
exports.Picture = db_1.default.Model.extend({
    tableName: 'pictures',
    hasTimestamps: ['create_at', 'update_at']
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGljdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvUGljdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUF5QjtBQUVaLFFBQUEsT0FBTyxHQUFHLFlBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ25DLFNBQVMsRUFBRSxVQUFVO0lBQ3JCLGFBQWEsRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7Q0FDNUMsQ0FBb0IsQ0FBQSJ9