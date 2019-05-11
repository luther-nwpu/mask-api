"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@libs/db");
const _models_1 = require("@models");
exports.Article = db_1.default.Model.extend({
    tableName: 'articles',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(_models_1.Picture, 'picture_id', 'picture_id');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQXJ0aWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUF5QjtBQUN6QixxQ0FBaUM7QUFDcEIsUUFBQSxPQUFPLEdBQUcsWUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDbkMsU0FBUyxFQUFFLFVBQVU7SUFDckIsYUFBYSxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztJQUN6QyxPQUFPLEVBQUU7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDOUQsQ0FBQztDQUNKLENBQW9CLENBQUEifQ==