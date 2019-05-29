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
const crypto_1 = require("crypto");
const fs = require("fs");
const path = require("path");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("@config");
function sha256(...data) {
    const hash = crypto_1.createHash('sha256');
    for (const block of data) {
        hash.update(block);
    }
    return hash.digest('hex');
}
exports.sha256 = sha256;
function sha1(data) {
    return crypto_1.createHash('sha1').update(data).digest('hex');
}
exports.sha1 = sha1;
function md5(data) {
    return crypto_1.createHash('md5').update(data).digest('hex');
}
exports.md5 = md5;
function tryCatch(promise) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ret = yield promise;
            return [ret, null];
        }
        catch (e) {
            return [null, e];
        }
    });
}
exports.tryCatch = tryCatch;
function syncTryCatch(functionCall) {
    try {
        const ret = functionCall;
        return [ret, null];
    }
    catch (e) {
        return [null, e];
    }
}
exports.syncTryCatch = syncTryCatch;
function createError(errMessage, status, userMessage) {
    let error;
    if (typeof errMessage === 'string') {
        error = new Error(errMessage);
    }
    else if (typeof errMessage === 'object') {
        error = errMessage;
    }
    else {
        throw new Error('类型错误，错误查询请见util/createError');
    }
    error.status = status;
    error.userMessage = userMessage;
    return error;
}
exports.createError = createError;
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
exports.mkdirsSync = mkdirsSync;
function readImg(filePath) {
    let data = [];
    return new Promise((resolve, reject) => {
        const readerStream = fs.createReadStream(`${filePath}`);
        readerStream.on('data', (chunk) => {
            data.push(chunk);
        });
        readerStream.on('end', () => {
            const finalData = Buffer.concat(data);
            resolve(finalData);
        });
    });
}
exports.readImg = readImg;
function signForToken(message) {
    return jsonwebtoken_1.sign({ data: message }, _config_1.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 3 });
}
exports.signForToken = signForToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWJzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyx5QkFBd0I7QUFDeEIsNkJBQTRCO0FBQzVCLCtDQUFtQztBQUNuQyxxQ0FBb0M7QUFNcEMsZ0JBQXdCLEdBQUcsSUFBYztJQUNyQyxNQUFNLElBQUksR0FBRyxtQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRWpDLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxFQUFFO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDckI7SUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDN0IsQ0FBQztBQVJELHdCQVFDO0FBTUQsY0FBc0IsSUFBWTtJQUM5QixPQUFPLG1CQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN4RCxDQUFDO0FBRkQsb0JBRUM7QUFFRCxhQUFxQixJQUFZO0lBQzdCLE9BQU8sbUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3ZELENBQUM7QUFGRCxrQkFFQztBQU1ELGtCQUE4QyxPQUFZOztRQUN0RCxJQUFJO1lBQ0EsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUE7WUFDekIsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFTLENBQUMsQ0FBQTtTQUMxQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLElBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN4QjtJQUNMLENBQUM7Q0FBQTtBQVBELDRCQU9DO0FBRUQsc0JBQTZDLFlBQWlCO0lBQzFELElBQUk7UUFDQSxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUE7UUFDeEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFTLENBQUMsQ0FBQTtLQUMxQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxDQUFDLElBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUN4QjtBQUNMLENBQUM7QUFQRCxvQ0FPQztBQUVELHFCQUE2QixVQUFlLEVBQUUsTUFBYyxFQUFFLFdBQW9CO0lBQzlFLElBQUksS0FBSyxDQUFBO0lBQ1QsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDaEMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0tBQ2hDO1NBQU0sSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7UUFDdkMsS0FBSyxHQUFHLFVBQVUsQ0FBQTtLQUNyQjtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0tBQ2pEO0lBQ0QsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDckIsS0FBSyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7SUFDL0IsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztBQVpELGtDQVlDO0FBT0Qsb0JBQTRCLE9BQU87SUFDL0IsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7U0FBTTtRQUNILElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUNuQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3JCLE9BQU8sSUFBSSxDQUFBO1NBQ2Q7S0FDSjtBQUNMLENBQUM7QUFURCxnQ0FTQztBQUtELGlCQUF5QixRQUFRO0lBRTdCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUN2RCxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7UUFFRixZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDeEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNyQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFkRCwwQkFjQztBQUVELHNCQUE4QixPQUFPO0lBQ2pDLE9BQU8sbUJBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxvQkFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDL0UsQ0FBQztBQUZELG9DQUVDIn0=