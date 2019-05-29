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
const uuid = require("uuid");
exports.Barrage = db_1.default.Model.extend({
    tableName: 'barrages',
    hasTimestamps: ['create_at', 'update_at']
}, {
    saveBarrage: (userId, text, videoId, videoTime, fontColor, fontSize) => __awaiter(this, void 0, void 0, function* () {
        return new exports.Barrage({ key: uuid.v4(), video_id: videoId, user_id: userId, text: text, video_time: videoTime, font_color: fontColor, font_size: fontSize }).save(null, { method: 'insert' }).then((model) => __awaiter(this, void 0, void 0, function* () {
            return model;
        }));
    })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFycmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQmFycmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXlCO0FBQ3pCLDZCQUE2QjtBQUNoQixRQUFBLE9BQU8sR0FBRyxZQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxTQUFTLEVBQUUsVUFBVTtJQUNyQixhQUFhLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO0NBQzVDLEVBQUU7SUFDQyxXQUFXLEVBQUUsQ0FBTyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQ3pFLE9BQU8sSUFBSSxlQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7WUFDNU0sT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtDQUNKLENBQVEsQ0FBQSJ9