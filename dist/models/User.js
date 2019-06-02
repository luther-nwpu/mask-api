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
exports.User = db_1.default.Model.extend({
    tableName: 'user',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(_models_1.Picture, 'picture_id', 'id');
    }
}, {
    getUser: (id) => __awaiter(this, void 0, void 0, function* () {
        return new exports.User({ id }).fetch({ withRelated: ['picture'] }).then((result) => __awaiter(this, void 0, void 0, function* () {
            return Object.assign({}, result.omit('password'), { picture: yield _models_1.Picture.getPicture(parseInt(result.get('picture_id'), 10)) });
        }));
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXlCO0FBQ3pCLHFDQUFpQztBQUNwQixRQUFBLElBQUksR0FBRyxZQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNoQyxTQUFTLEVBQUUsTUFBTTtJQUNqQixhQUFhLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0lBQ3pDLE9BQU8sRUFBRTtRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBTyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0NBQ0osRUFBRTtJQUNDLE9BQU8sRUFBRSxDQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ2xCLE9BQU8sSUFBSSxZQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtZQUM5RSx5QkFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUU7UUFDcEgsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtDQUNKLENBQVEsQ0FBQSJ9