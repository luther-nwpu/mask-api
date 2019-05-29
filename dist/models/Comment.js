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
exports.Comment = db_1.default.Model.extend({
    tableName: 'comments',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getCommentByHaiyouId: (haiyouId) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Comment().where('haiyou_id', haiyouId).orderBy('create_at').fetchAll().then((result) => {
            return Promise.all(result.map((value) => __awaiter(this, void 0, void 0, function* () {
                const subComments = yield _models_1.SubComment.getAllSubCommentsByMainComment(value.get('id'));
                const user = yield _models_1.User.getUser(value.get('user_id'));
                return Object.assign({ user, subComments }, (value.toJSON()));
            })));
        });
    }),
    saveComment: (content, uid, haiyouId) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Comment({ content, user_id: uid, haiyou_id: haiyouId }).save(null, { method: 'insert' }).then((model) => __awaiter(this, void 0, void 0, function* () {
            return exports.Comment.getCommentByHaiyouId(haiyouId);
        }));
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQ29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXlCO0FBQ3pCLHFDQUEwQztBQUM3QixRQUFBLE9BQU8sR0FBRyxZQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxTQUFTLEVBQUUsVUFBVTtJQUNyQixhQUFhLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQzVDLEVBQUU7SUFDQyxvQkFBb0IsRUFBRSxDQUFPLFFBQVEsRUFBRSxFQUFFO1FBQ3JDLE9BQU8sSUFBSSxlQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM5RixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFPLEtBQUssRUFBRSxFQUFFO2dCQUMxQyxNQUFNLFdBQVcsR0FBRyxNQUFNLG9CQUFVLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2dCQUNwRixNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO2dCQUNyRCx1QkFBUyxJQUFJLEVBQUUsV0FBVyxJQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDckQsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUE7SUFDRCxXQUFXLEVBQUUsQ0FBTyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQzFDLE9BQU8sSUFBSSxlQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7WUFDckgsT0FBTyxlQUFPLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDakQsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtDQUNKLENBQVEsQ0FBQSJ9