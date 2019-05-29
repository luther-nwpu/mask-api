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
const nodemailer = require("nodemailer");
const _config_1 = require("@config");
const redis_1 = require("@libs/redis");
const transporter = nodemailer.createTransport({
    service: _config_1.SENDEMAIL.SERVICE,
    port: _config_1.SENDEMAIL.PORT,
    secure: true,
    host: _config_1.SENDEMAIL.HOST,
    auth: {
        user: _config_1.SENDEMAIL.USER,
        pass: _config_1.SENDEMAIL.PASS
    }
});
function sendEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkcode = Math.random().toString().slice(-6);
        redis_1.default.set(email, checkcode);
        redis_1.default.expire(email, 10 * 60);
        let mailOptions = {
            from: '"好嗨哟" <18829589407@163.com>',
            to: email,
            subject: '好嗨哟 check your code',
            text: 'Hi 好嗨哟',
            html: `<b>好嗨哟向您发送了验证码<hr>${checkcode}</hr>, 有效期限为10分钟</b>`
        };
        let info = yield transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9lbWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLHFDQUFtQztBQUNuQyx1Q0FBK0I7QUFDL0IsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztJQUMzQyxPQUFPLEVBQUUsbUJBQVMsQ0FBQyxPQUFPO0lBQzFCLElBQUksRUFBRSxtQkFBUyxDQUFDLElBQUk7SUFDcEIsTUFBTSxFQUFFLElBQUk7SUFDWixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxJQUFJO0lBQ3BCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxtQkFBUyxDQUFDLElBQUk7UUFDcEIsSUFBSSxFQUFFLG1CQUFTLENBQUMsSUFBSTtLQUN2QjtDQUNKLENBQUMsQ0FBQTtBQUVGLG1CQUFnQyxLQUFLOztRQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDcEQsZUFBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDM0IsZUFBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBRTVCLElBQUksV0FBVyxHQUFHO1lBQ2QsSUFBSSxFQUFFLDZCQUE2QjtZQUNuQyxFQUFFLEVBQUUsS0FBSztZQUNULE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUscUJBQXFCLFNBQVMsc0JBQXNCO1NBQzdELENBQUE7UUFFRCxJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDbkQsQ0FBQztDQUFBO0FBZkQsOEJBZUMifQ==