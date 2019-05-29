import * as ffmpeg from 'fluent-ffmpeg'
ffmpeg.setFfmpegPath('D:/Program Files/ffmpeg-20190323-5fceac1-win64-static/bin/ffmpeg.exe')
ffmpeg.setFfprobePath('D:/Program Files/ffmpeg-20190323-5fceac1-win64-static/bin/ffprobe.exe')

export const returnVideoImg = (videoUrl) => {
    return new Promise((resolve, reject) => {
        ffmpeg(videoUrl)
        .on('filenames', (filenames: Array<Object>) => {
            resolve(filenames)
        })
        .on('end', function () {
            console.log('Screenshots taken')
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 5,
            filename: '%f'.split('.')[0] + '_' + new Date().getTime() + '_%s_%i',
            folder: '/static/screenshots',
            size: '320x240'
        })
    })
}
