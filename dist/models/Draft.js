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
const db_1 = require("@libs/db");
const _models_1 = require("@models");
exports.Draft = db_1.default.Model.extend({
    tableName: 'drafts',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(_models_1.Picture, 'select_picture', 'id');
    },
    getDrafts: (id) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Draft().query('where', 'id', '=', id).fetch().then((draft) => __awaiter(this, void 0, void 0, function* () {
            const videoArr = draft.get('video_id') ? draft.get('video_id').split('_') : [];
            const pictureArr = draft.get('picture_id') ? draft.get('picture_id').split('_') : [];
            const videoResult = yield videoArr.reduce((total, currentValue) => __awaiter(this, void 0, void 0, function* () {
                const accumulator = yield total;
                accumulator.push(yield _models_1.Video.getVideo(parseInt(currentValue, 10)));
                return Promise.resolve(accumulator);
            }), Promise.resolve([]));
            const pictureResult = yield pictureArr.reduce((total, currentValue) => __awaiter(this, void 0, void 0, function* () {
                const accumulator = yield total;
                accumulator.push(yield _models_1.Picture.getPicture(parseInt(currentValue, 10)));
                return Promise.resolve(accumulator);
            }), Promise.resolve([]));
            const userResult = draft.get('user_id') ? yield _models_1.User.getUser(draft.get('user_id')) : null;
            return Object.assign({ pictureResult, videoResult, userResult }, (draft.toJSON()));
        }));
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0RyYWZ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBeUI7QUFDekIscUNBQThDO0FBQ2pDLFFBQUEsS0FBSyxHQUFHLFlBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2pDLFNBQVMsRUFBRSxRQUFRO0lBQ25CLGFBQWEsRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7SUFDekMsT0FBTyxFQUFFO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUNELFNBQVMsRUFBRSxDQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ3BCLE9BQU8sSUFBSSxhQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7WUFDMUUsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtZQUM5RSxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBQ3BGLE1BQU0sV0FBVyxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFPLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRTtnQkFDcEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxLQUFLLENBQUE7Z0JBQy9CLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxlQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNsRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDdkMsQ0FBQyxDQUFBLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3ZCLE1BQU0sYUFBYSxHQUFHLE1BQU0sVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFPLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRTtnQkFDeEUsTUFBTSxXQUFXLEdBQUcsTUFBTSxLQUFLLENBQUE7Z0JBQy9CLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDdEUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3ZDLENBQUMsQ0FBQSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN2QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLGNBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFDekYsdUJBQVMsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLElBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtRQUMxRSxDQUFDLENBQUEsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0NBQ0osQ0FBUSxDQUFBIn0=