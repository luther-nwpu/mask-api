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
        util_1.mkdirsSync('video/');
        const file = ctx.request.files.file;
        const reader = fs.createReadStream(file.path);
        const fileNameArr = file.name.split('.');
        const ext = fileNameArr.pop();
        const oldFileName = fileNameArr.join();
        const newFileName = `${oldFileName}_${new Date().getTime()}`;
        const newFileUrl = `video/${newFileName}.${ext}`;
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
        util_1.mkdirsSync('video/');
        const file = ctx.request.files.file;
        const reader = fs.createReadStream(file.path);
        const fileNameArr = file.name.split('.');
        const ext = fileNameArr.pop();
        const oldFileName = fileNameArr.join();
        const newFileName = `${oldFileName}_${new Date().getTime()}`;
        const newFileUrl = `video/${newFileName}.${ext}`;
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
        util_1.mkdirsSync('upload/img/');
        const file = ctx.request.files.file;
        const reader = fs.createReadStream(file.path);
        const fileNameArr = file.name.split('.');
        const ext = fileNameArr.pop();
        const oldFileName = fileNameArr.join();
        const newFileName = `${oldFileName}_${new Date().getTime()}`;
        const newFileUrl = `upload/img/${newFileName}.${ext}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy91cGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdDQUF1QztBQUN2Qyx5QkFBd0I7QUFDeEIscUNBQWlEO0FBQ2pELHFDQUErQztBQUMvQyx5Q0FBNkM7QUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQTtBQUU5QixNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3RDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxlQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFpQixFQUFFLE1BQWdCLEVBQUUsRUFBRTtRQUM3RixpQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3BCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQTtRQUNuQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUM3QixNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDdEMsTUFBTSxXQUFXLEdBQUcsR0FBRyxXQUFXLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFBO1FBQzVELE1BQU0sVUFBVSxHQUFHLFNBQVMsV0FBVyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2hELE1BQU0sUUFBUSxH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