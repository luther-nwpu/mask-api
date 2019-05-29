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
exports.SubComment = db_1.default.Model.extend({
    tableName: 'subcomments',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getAllSubCommentsByMainComment: (mainCommentId) => __awaiter(this, void 0, void 0, function* () {
        return new exports.SubComment().where('comment_id', mainCommentId).orderBy('create_at').fetchAll().then(result => {
            return Promise.all(result.map((value) => __awaiter(this, void 0, void 0, function* () {
                const user = yield _models_1.User.getUser(value.get('user_id'));
                const suser = yield _models_1.User.getUser(value.get('suser_id'));
                return Object.assign({ user, suser }, (value.toJSON()));
            })));
        });
    }),
    saveSubComment: (mainCommentId, content, userId, suserId, haiyouId) => __awaiter(this, void 0, void 0, function* () {
        return new exports.SubComment({ comment_id: mainCommentId, content, user_id: userId, suser_id: suserId }).save(null, { method: 'insert' }).then((model) => __awaiter(this, void 0, void 0, function* () {
            return _models_1.Comment.getCommentByHaiyouId(haiyouId);
        }));
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvU3ViQ29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXlCO0FBQ3pCLHFDQUF1QztBQUMxQixRQUFBLFVBQVUsR0FBRyxZQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN0QyxTQUFTLEVBQUUsYUFBYTtJQUN4QixhQUFhLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQzVDLEVBQUU7SUFDQyw4QkFBOEIsRUFBRSxDQUFPLGFBQWEsRUFBRSxFQUFFO1FBQ3BELE9BQU8sSUFBSSxrQkFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JHLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7Z0JBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3JELE1BQU0sS0FBSyxHQUFHLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7Z0JBQ3ZELHVCQUFTLElBQUksRUFBRSxLQUFLLElBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUMvQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQUNELGNBQWMsRUFBRSxDQUFPLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtRQUN4RSxPQUFPLElBQUksa0JBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFPLEtBQUssRUFBRSxFQUFFO1lBQ3BKLE9BQU8saUJBQU8sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNqRCxDQUFDLENBQUEsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0NBQ0osQ0FBUSxDQUFBIn0=