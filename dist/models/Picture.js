"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@libs/db");
const Promise = require("bluebird");
exports.Picture = db_1.default.Model.extend({
    tableName: 'picture',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getPicture: Promise.method((id) => {
        return new exports.Picture().query('where', 'id', '=', id).fetch().then((picture) => {
            return picture.toJSON();
        });
    }),
    savePicture: Promise.method((pictureInfo) => {
        return new exports.Picture(pictureInfo).save(null, { method: 'insert' }).then(model => {
            return model;
        });
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGljdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvUGljdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUF5QjtBQUN6QixvQ0FBbUM7QUFFdEIsUUFBQSxPQUFPLEdBQUcsWUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDbkMsU0FBUyxFQUFFLFNBQVM7SUFDcEIsYUFBYSxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztDQUM1QyxFQUFFO0lBQ0MsVUFBVSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUM5QixPQUFPLElBQUksZUFBTyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hFLE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQzNCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDO0lBQ0YsV0FBVyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUN4QyxPQUFPLElBQUksZUFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUUsT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUM7Q0FDTCxDQUFRLENBQUEifQ==