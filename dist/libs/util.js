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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWJzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyx5QkFBd0I7QUFDeEIsNkJBQTRCO0FBTTVCLGdCQUF3QixHQUFHLElBQWM7SUFDckMsTUFBTSxJQUFJLEdBQUcsbUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUVqQyxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksRUFBRTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ3JCO0lBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzdCLENBQUM7QUFSRCx3QkFRQztBQU1ELGNBQXNCLElBQVk7SUFDOUIsT0FBTyxtQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDeEQsQ0FBQztBQUZELG9CQUVDO0FBRUQsYUFBcUIsSUFBWTtJQUM3QixPQUFPLG1CQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN2RCxDQUFDO0FBRkQsa0JBRUM7QUFNRCxrQkFBOEMsT0FBWTs7UUFDdEQsSUFBSTtZQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFBO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBUyxDQUFDLENBQUE7U0FDMUI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxJQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDeEI7SUFDTCxDQUFDO0NBQUE7QUFQRCw0QkFPQztBQUVELHNCQUE2QyxZQUFpQjtJQUMxRCxJQUFJO1FBQ0EsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFBO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBUyxDQUFDLENBQUE7S0FDMUI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sQ0FBQyxJQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FDeEI7QUFDTCxDQUFDO0FBUEQsb0NBT0M7QUFFRCxxQkFBNkIsVUFBZSxFQUFFLE1BQWMsRUFBRSxXQUFvQjtJQUM5RSxJQUFJLEtBQUssQ0FBQTtJQUNULElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1FBQ2hDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtLQUNoQztTQUFNLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1FBQ3ZDLEtBQUssR0FBRyxVQUFVLENBQUE7S0FDckI7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtLQUNqRDtJQUNELEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3JCLEtBQUssQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO0lBQy9CLE9BQU8sS0FBSyxDQUFBO0FBQ2hCLENBQUM7QUFaRCxrQ0FZQztBQU9ELG9CQUE0QixPQUFPO0lBQy9CLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4QixPQUFPLElBQUksQ0FBQTtLQUNkO1NBQU07UUFDSCxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7WUFDbkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNyQixPQUFPLElBQUksQ0FBQTtTQUNkO0tBQ0o7QUFDTCxDQUFDO0FBVEQsZ0NBU0M7QUFLRCxpQkFBeUIsUUFBUTtJQUU3QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFDYixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDdkQsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO1FBRUYsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ3hCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDckMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBZEQsMEJBY0MifQ==