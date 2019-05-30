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
const koaRouter = require("koa-router");
const fs = require("fs");
const util_1 = require("@libs/util");
const _models_1 = require("@models");
const ffmpeg_1 = require("@libs/ffmpeg");
const router = new koaRouter();
router.prefix('/api/upload');
router.post('/video', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const [result, error] = yield util_1.tryCatch(new Promise((resovle, reject) => __awaiter(this, void 0, void 0, function* () {
        util_1.mkdirsSync('/static/video/');
        const file = ctx.request.files.file;
        const reader = fs.createReadStream(file.path);
        const fileNameArr = file.name.split('.');
        const ext = fileNameArr.pop();
        const oldFileName = fileNameArr.join();
        const newFileName = `${oldFileName}_${new Date().getTime()}`;
        const newFileUrl = `/static/video/${newFileName}.${ext}`;
        const upStream = fs.createWriteStream(newFileUrl);
        reader.pipe(upStream);
        new _models_1.Video({ name: oldFileName, url: newFileUrl }).save(null, { method: 'insert' }).then(model => {
            resovle(model);
        }).catch(err => {
            reject(err);
        });
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result: result };
}));
router.post('/firstvideo', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const userId = ctx.state['$user'].data;
    const [result, error] = yield util_1.tryCatch(new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        util_1.mkdirsSync('/static/video/');
        const file = ctx.request.files.file;
        const reader = fs.createReadStream(file.path);
        const fileNameArr = file.name.split('.');
        const ext = fileNameArr.pop();
        const oldFileName = fileNameArr.join();
        const newFileName = `${oldFileName}_${new Date().getTime()}`;
        const newFileUrl = `/static/video/${newFileName}.${ext}`;
        const upStream = fs.createWriteStream(newFileUrl);
        reader.pipe(upStream);
        const imgs = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            reader.on('end', () => __awaiter(this, void 0, void 0, function* () {
                resolve(yield ffmpeg_1.returnVideoImg(newFileUrl));
            }));
        }));
        const imgArr = [];
        const imgIndex = [];
        for (let item of imgs) {
            const newPicture = yield _models_1.Picture.savePicture({ name: item, url: item, user_id: userId });
            imgArr.push(newPicture);
            imgIndex.push(newPicture.id);
        }
        const uploadVideo = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            new _models_1.Video({ name: oldFileName, url: newFileUrl }).save(null, { method: 'insert' }).then(model => {
                resolve(model);
            }).catch(err => {
                reject(err);
            });
        }));
        new _models_1.Draft({ video_id: uploadVideo.id, user_id: userId, picture_id: imgIndex.join('_') }).save(null, { method: 'insert' }).then(draft => {
            resolve({ draft, uploadVideo, imgArr });
        });
    })));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result: result };
}));
router.post('/uploadImg', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const [result, error] = yield util_1.tryCatch(new Promise((resovle, reject) => {
        util_1.mkdirsSync('/static/picture/');
        const file = ctx.request.files.file;
        const reader = fs.createReadStream(file.path);
        const fileNameArr = file.name.split('.');
        const ext = fileNameArr.pop();
        const oldFileName = fileNameArr.join();
        const newFileName = `${oldFileName}_${new Date().getTime()}`;
        const newFileUrl = `/static/picture/${newFileName}.${ext}`;
        const upStream = fs.createWriteStream(newFileUrl);
        reader.pipe(upStream);
        new _models_1.Picture({ name: oldFileName, url: newFileUrl }).save(null, { method: 'insert' }).then(model => {
            resovle(model);
        }).catch(err => {
            reject(err);
        });
    }));
    if (error) {
        return ctx.body = { success: false, result: error };
    }
    return ctx.body = { success: true, result: result };
}));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy91cGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdDQUF1QztBQUN2Qyx5QkFBd0I7QUFDeEIscUNBQWlEO0FBQ2pELHFDQUErQztBQUMvQyx5Q0FBNkM7QUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQTtBQUU5QixNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3RDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxlQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFpQixFQUFFLE1BQWdCLEVBQUUsRUFBRTtRQUM3RixpQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDNUIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBO1FBQ25DLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDeEMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQzdCLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN0QyxNQUFNLFdBQVcsR0FBRyxHQUFHLFdBQVcsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUE7UUFDNUQsTUFBTSxVQUFVLEdBQUcsaUJBQWlCLFdBQVcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUN4RCxNQUFNLFFB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