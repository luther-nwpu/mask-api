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
exports.History = db_1.default.Model.extend({
    tableName: 'history',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getAllHistoryByUserId: (id) => __awaiter(this, void 0, void 0, function* () {
        return new exports.History().where('user_id', id).fetchAll().then((model) => {
            return Promise.all(model.map((value) => __awaiter(this, void 0, void 0, function* () {
                const haiyou = yield _models_1.Haiyou.getHaiyou(value.get('haiyou_id'));
                return Object.assign({ haiyou }, value.toJSON());
            })));
        });
    }),
    saveHistory: (userId, haiyouId) => __awaiter(this, void 0, void 0, function* () {
        return new exports.History({ user_id: userId, haiyou_id: haiyouId }).fetch().then((model) => {
            if (model == null) {
                new exports.History({ user_id: userId, haiyou_id: haiyouId }).save(null, { method: 'insert' });
            }
            else {
                model.set('update_at', new Date());
                model.save();
            }
        });
    }),
    deleteHistory: (id) => __awaiter(this, void 0, void 0, function* () {
        return new exports.History({ id }).destroy().then((model) => {
            return model;
        });
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvSGlzdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXlCO0FBQ3pCLHFDQUFnQztBQUNuQixRQUFBLE9BQU8sR0FBRyxZQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxTQUFTLEVBQUUsU0FBUztJQUNwQixhQUFhLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQzVDLEVBQUU7SUFDQyxxQkFBcUIsRUFBRSxDQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ2hDLE9BQU8sSUFBSSxlQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2hFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7Z0JBQ3pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO2dCQUM3RCx1QkFBUyxNQUFNLElBQUssS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3hDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0lBQ0QsV0FBVyxFQUFFLENBQU8sTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQ3BDLE9BQU8sSUFBSSxlQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2hGLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDZixJQUFJLGVBQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO2FBQ3pGO2lCQUFNO2dCQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDbEMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO2FBQ2Y7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQUNELGFBQWEsRUFBRSxDQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxlQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2hELE9BQU8sS0FBSyxDQUFBO1FBQ2hCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0NBQ0osQ0FBUSxDQUFBIn0=