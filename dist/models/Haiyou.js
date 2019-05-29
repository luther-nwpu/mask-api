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
exports.Haiyou = db_1.default.Model.extend({
    tableName: 'haiyous',
    hasTimestamps: ['create_at', 'update_at'],
    picture: function () {
        return this.belongsTo(_models_1.Picture, 'picture_id', 'id');
    }
}, {
    getHaiyou: (id) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Haiyou({ id }).fetch({ withRelated: ['picture'] }).then((result) => {
            return result;
        });
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFpeW91LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9IYWl5b3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUF5QjtBQUN6QixxQ0FBaUM7QUFDcEIsUUFBQSxNQUFNLEdBQUcsWUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDbEMsU0FBUyxFQUFFLFNBQVM7SUFDcEIsYUFBYSxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztJQUN6QyxPQUFPLEVBQUU7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDdEQsQ0FBQztDQUNKLEVBQUU7SUFDQyxTQUFTLEVBQUUsQ0FBTyxFQUFFLEVBQUUsRUFBRTtRQUNwQixPQUFPLElBQUksY0FBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDMUUsT0FBTyxNQUFNLENBQUE7UUFDakIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUE7Q0FDSixDQUFRLENBQUEifQ==