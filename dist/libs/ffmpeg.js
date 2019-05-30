"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ffmpeg = require("fluent-ffmpeg");
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
            folder: '/static/screenshots',
            size: '320x240'
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYnMvZmZtcGVnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXVDO0FBSTFCLFFBQUEsY0FBYyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7SUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxNQUFNLENBQUMsUUFBUSxDQUFDO2FBQ2YsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQXdCLEVBQUUsRUFBRTtZQUMxQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLEtBQUssRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUNwQyxDQUFDLENBQUM7YUFDRCxXQUFXLENBQUM7WUFFVCxLQUFLLEVBQUUsQ0FBQztZQUNSLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVE7WUFDcEUsTUFBTSxFQUFFLHFCQUFxQjtZQUM3QixJQUFJLEVBQUUsU0FBUztTQUNsQixDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSJ9