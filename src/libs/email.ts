import * as nodemailer from 'nodemailer'
import { SENDEMAIL } from '@config'
import redis from '@libs/redis'
const transporter = nodemailer.createTransport({
    service: SENDEMAIL.SERVICE,
    port: SENDEMAIL.PORT,
    secure: true,
    host: SENDEMAIL.HOST,
    auth: {
        user: SENDEMAIL.USER,
        pass: SENDEMAIL.PASS
    }
})

export async function sendEmail(email) {
    const checkcode = Math.random().toString().slice(-6)
    redis.set(email, checkcode)
    redis.expire(email, 10 * 60)
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"好嗨哟" <18829589407@163.com>', // sender address
        to: email, // list of receivers
        subject: '好嗨哟 check your code', // Subject line
        text: 'Hi 好嗨哟', // plain text body
        html: `<b>好嗨哟向您发送了验证码<hr>${checkcode}</hr>, 有效期限为10分钟</b>` // html body
    }
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
}
