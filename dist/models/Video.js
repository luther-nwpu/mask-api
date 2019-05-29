"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@libs/db");
const Promise = require("bluebird");
exports.Video = db_1.default.Model.extend({
    tableName: 'video',
    hasTimestamps: ['create_at', 'update_at'],
}, {
    getVideo: Promise.method((id) => {
        return new exports.Video().query('where', 'id', '=', id).fetch().then((video) => {
            return video.toJSON();
        });
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlkZW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1ZpZGVvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQXlCO0FBQ3pCLG9DQUFtQztBQUV0QixRQUFBLEtBQUssR0FBRyxZQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxTQUFTLEVBQUUsT0FBTztJQUNsQixhQUFhLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQzVDLEVBQUU7SUFDQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQzVCLE9BQU8sSUFBSSxhQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEUsT0FBTyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDekIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUM7Q0FDTCxDQUFRLENBQUEifQ==