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
exports.Chat = db_1.default.Model.extend({
    tableName: 'chat',
    hasTimestamps: ['create_at', 'update_at']
}, {
    getChat: (id) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Chat({ id }).fetch().then((result) => __awaiter(this, void 0, void 0, function* () {
            const user = yield _models_1.User.getUser(result.get('user_id'));
            const suser = yield _models_1.User.getUser(result.get('suser_id'));
            return Object.assign({ user, suser }, (result.toJSON()));
        }));
    }),
    getChatByUser: (uid) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Chat().query({ where: { user_id: uid }, orWhere: { suser_id: uid } }).fetchAll().then((result) => {
            return Promise.all(result.map((value) => __awaiter(this, void 0, void 0, function* () {
                const user = yield _models_1.User.getUser(value.get('user_id'));
                const suser = yield _models_1.User.getUser(value.get('suser_id'));
                return Object.assign({ user, suser }, (value.toJSON()));
            })));
        });
    }),
    readMyChat: (uid) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Chat().query({ where: { user_id: uid }, orWhere: { suser_id: uid } }).fetchAll().then((result) => {
            return Promise.all(result.map((value) => __awaiter(this, void 0, void 0, function* () {
                const user = yield _models_1.User.getUser(value.get('user_id'));
                const suser = yield _models_1.User.getUser(value.get('suser_id'));
                if (value.get('suser_id') === uid) {
                    yield value.save({ is_read: true }, {
                        method: 'update',
                        patch: true
                    });
                }
                return Object.assign({ user, suser }, (value.toJSON()));
            })));
        });
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQ2hhdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXlCO0FBQ3pCLHFDQUE4QjtBQUNqQixRQUFBLElBQUksR0FBRyxZQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNoQyxTQUFTLEVBQUUsTUFBTTtJQUNqQixhQUFhLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQzVDLEVBQUU7SUFDQyxPQUFPLEVBQUUsQ0FBTyxFQUFFLEVBQUUsRUFBRTtRQUNsQixPQUFPLElBQUksWUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtZQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1lBQ3RELE1BQU0sS0FBSyxHQUFHLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7WUFDeEQsdUJBQVMsSUFBSSxFQUFFLEtBQUssSUFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1FBQ2hELENBQUMsQ0FBQSxDQUFDLENBQUE7SUFDTixDQUFDLENBQUE7SUFDRCxhQUFhLEVBQUUsQ0FBTyxHQUFHLEVBQUUsRUFBRTtRQUN6QixPQUFPLElBQUksWUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDeEcsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtnQkFDckQsTUFBTSxLQUFLLEdBQUcsTUFBTSxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtnQkFDdkQsdUJBQVMsSUFBSSxFQUFFLEtBQUssSUFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQy9DLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0lBQ0QsVUFBVSxFQUFFLENBQU8sR0FBRyxFQUFFLEVBQUU7UUFDdEIsT0FBTyxJQUFJLFlBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3hHLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7Z0JBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3JELE1BQU0sS0FBSyxHQUFHLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7Z0JBQ3ZELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQy9CLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRTt3QkFDaEMsTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLEtBQUssRUFBRSxJQUFJO3FCQUNkLENBQUMsQ0FBQTtpQkFDTDtnQkFDRCx1QkFBUyxJQUFJLEVBQUUsS0FBSyxJQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDL0MsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUE7Q0FDSixDQUFRLENBQUEifQ==