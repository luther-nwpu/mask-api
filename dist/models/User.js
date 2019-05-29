"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@libs/db");
const Promise = require("bluebird");
const _models_1 = require("@models");
exports.User = db_1.default.Model.extend({
    tableName: 'user',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(_models_1.Picture, 'picture_id', 'id');
    }
}, {
    getUser: Promise.method((id) => {
        return new exports.User({ id }).fetch({ withRelated: ['picture'] }).then((result) => {
            return result && result.omit('password');
        });
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUF5QjtBQUN6QixvQ0FBbUM7QUFDbkMscUNBQWlDO0FBQ3BCLFFBQUEsSUFBSSxHQUFHLFlBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2hDLFNBQVMsRUFBRSxNQUFNO0lBQ2pCLGFBQWEsRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7SUFDekMsT0FBTyxFQUFFO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3RELENBQUM7Q0FDSixFQUFFO0lBQ0MsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUMzQixPQUFPLElBQUksWUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDeEUsT0FBTyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQztDQUNMLENBQVEsQ0FBQSJ9