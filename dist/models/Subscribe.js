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
exports.Subscribe = db_1.default.Model.extend({
    tableName: 'subscribe',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getAllSubscribeByUserId: (id) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Subscribe().where('user_id', id).fetchAll().then((model) => {
            return Promise.all(model.map((value) => __awaiter(this, void 0, void 0, function* () {
                const suser = yield _models_1.User.getUser(value.get('suser_id'));
                const subscribeCount = yield exports.Subscribe.getSubScribeCount(value.get('suser_id'));
                return Object.assign({ suser, subscribeCount }, (value.toJSON()));
            })));
        });
    }),
    subscribeUser: (userId, suserId) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Subscribe({ user_id: userId, suser_id: suserId }).save(null, { method: 'insert' }).then((model) => __awaiter(this, void 0, void 0, function* () {
            return model;
        }));
    }),
    deleteSubscribe: (id) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Subscribe({ id }).destroy().then((model) => {
            return model;
        });
    }),
    judgeSubscribe: (userId, suserId) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Subscribe({ user_id: userId, suser_id: suserId }).fetch().then((model) => {
            return model;
        });
    }),
    getSubScribeCount: (suserId) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Subscribe({ suser_id: suserId }).count().then((count) => {
            return count;
        });
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vic2NyaWJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9TdWJzY3JpYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUF5QjtBQUN6QixxQ0FBOEI7QUFDakIsUUFBQSxTQUFTLEdBQUcsWUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDckMsU0FBUyxFQUFFLFdBQVc7SUFDdEIsYUFBYSxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztDQUM1QyxFQUFFO0lBQ0MsdUJBQXVCLEVBQUUsQ0FBTyxFQUFFLEVBQUUsRUFBRTtRQUNsQyxPQUFPLElBQUksaUJBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbEUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDekMsTUFBTSxLQUFLLEdBQUcsTUFBTSxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtnQkFDdkQsTUFBTSxjQUFjLEdBQUcsTUFBTSxpQkFBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtnQkFDL0UsdUJBQVMsS0FBSyxFQUFFLGNBQWMsSUFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ3pELENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0lBQ0QsYUFBYSxFQUFFLENBQU8sTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQ3JDLE9BQU8sSUFBSSxpQkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7WUFDL0csT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQUNELGVBQWUsRUFBRSxDQUFPLEVBQUUsRUFBRSxFQUFFO1FBQzFCLE9BQU8sSUFBSSxpQkFBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNsRCxPQUFPLEtBQUssQ0FBQTtRQUNoQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQUNELGNBQWMsRUFBRSxDQUFPLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRTtRQUN0QyxPQUFPLElBQUksaUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDaEYsT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUE7SUFDRCxpQkFBaUIsRUFBRSxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE9BQU8sSUFBSSxpQkFBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDL0QsT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUE7Q0FDSixDQUFRLENBQUEifQ==