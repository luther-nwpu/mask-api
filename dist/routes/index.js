"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
exports.authRouter = auth_1.default;
const admin_1 = require("./admin");
exports.adminRouter = admin_1.default;
const common_1 = require("./common");
exports.commonRouter = common_1.default;
const upload_1 = require("./upload");
exports.uploadRouter = upload_1.default;
const drafts_1 = require("./drafts");
exports.draftsRouter = drafts_1.default;
const haiyou_1 = require("./haiyou");
exports.haiyouRouter = haiyou_1.default;
const socket_1 = require("./socket");
exports.socketRouter = socket_1.default;
const barrage_1 = require("./barrage");
exports.barrageRouter = barrage_1.default;
const chat_1 = require("./chat");
exports.chatRouter = chat_1.default;
const comment_1 = require("./comment");
exports.commentRouter = comment_1.default;
const video_1 = require("./video");
exports.videoRouter = video_1.default;
const history_1 = require("./history");
exports.historyRouter = history_1.default;
const subscribe_1 = require("./subscribe");
exports.subscriberRouter = subscribe_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQStCO0FBc0IzQixxQkF0QkcsY0FBVSxDQXNCSDtBQXJCZCxtQ0FBaUM7QUFzQjdCLHNCQXRCRyxlQUFXLENBc0JIO0FBckJmLHFDQUFtQztBQXNCL0IsdUJBdEJHLGdCQUFZLENBc0JIO0FBckJoQixxQ0FBbUM7QUFzQi9CLHVCQXRCRyxnQkFBWSxDQXNCSDtBQXJCaEIscUNBQW1DO0FBc0IvQix1QkF0QkcsZ0JBQVksQ0FzQkg7QUFyQmhCLHFDQUFtQztBQXNCL0IsdUJBdEJHLGdCQUFZLENBc0JIO0FBckJoQixxQ0FBbUM7QUFlL0IsdUJBZkcsZ0JBQVksQ0FlSDtBQWRoQix1Q0FBcUM7QUFhakMsd0JBYkcsaUJBQWEsQ0FhSDtBQVpqQixpQ0FBK0I7QUFXM0IscUJBWEcsY0FBVSxDQVdIO0FBVmQsdUNBQXFDO0FBU2pDLHdCQVRHLGlCQUFhLENBU0g7QUFSakIsbUNBQWlDO0FBTzdCLHNCQVBHLGVBQVcsQ0FPSDtBQU5mLHVDQUFxQztBQUlqQyx3QkFKRyxpQkFBYSxDQUlIO0FBSGpCLDJDQUEwQztBQUl0QywyQkFKRyxtQkFBZ0IsQ0FJSCJ9