"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath('D:/Program Files/ffmpeg-20190323-5fceac1-win64-static/bin/ffmpeg.exe');
ffmpeg.setFfprobePath('D:/Program Files/ffmpeg-20190323-5fceac1-win64-static/bin/ffprobe.exe');
exports.returnVideoImg = (videoUrl) => {
    return new Promise((resolve, reject) => {
        ffmpeg(videoUrl)
            .on('filenames', (filenames) => {
            resolve(filenames);
        })
            .on('end', function () {
            console.log('Screenshots taken');
        })
            .screenshots({
            count: 5,
            filename: '%f'.split('.')[0] + '_' + new Date().getTime() + '_%s_%i',
            folder: 'output',
            size: '320x240'
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYnMvZmZtcGVnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXVDO0FBQ3ZDLE1BQU0sQ0FBQyxhQUFhLENBQUMsc0VBQXNFLENBQUMsQ0FBQTtBQUM1RixNQUFNLENBQUMsY0FBYyxDQUFDLHVFQUF1RSxDQUFDLENBQUE7QUFFakYsUUFBQSxjQUFjLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtJQUN2QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDZixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBd0IsRUFBRSxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsS0FBSyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQ3BDLENBQUMsQ0FBQzthQUNELFdBQVcsQ0FBQztZQUVULEtBQUssRUFBRSxDQUFDO1lBQ1IsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUTtZQUNwRSxNQUFNLEVBQUUsUUFBUTtZQUNoQixJQUFJLEVBQUUsU0FBUztTQUNsQixDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSJ9