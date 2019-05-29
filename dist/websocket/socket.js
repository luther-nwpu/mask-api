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
const ws_1 = require("ws");
const util_1 = require("util");
const util_2 = require("@libs/util");
const redis_1 = require("@libs/redis");
const _models_1 = require("@models");
var Action;
(function (Action) {
    Action["SENDMESSAGE"] = "sendMessage";
    Action["SENDBARRAGE"] = "sendBarrage";
    Action["RECEIVEMESSAGE"] = "receiveMessage";
    Action["RECEIVEBARRAGE"] = "receiveBarrage";
})(Action || (Action = {}));
class WebSocket {
    constructor(options) {
        this.wss = null;
        this.clients = new WeakMap();
        this.broadcast = (targets, data) => {
            const message = {
                targets: [...new Set(targets)],
                payload: data
            };
            console.log('[Websocket] Broadcast task: %s', JSON.stringify(message));
            redis_1.publisher('broadcast', JSON.stringify(message));
        };
        this.handleBroadcast = (rawMessage) => {
            const [message, err] = util_2.syncTryCatch(JSON.parse(rawMessage));
            const ids = new Set(message.targets);
            for (const ws of this.wss.clients) {
                const socketInfo = this.clients.get(ws);
                if (ids.has(socketInfo.tunnelId) || ids.has(socketInfo.uid) || ids.has(socketInfo.haiyouId)) {
                    console.log('[Websocket] Push message: %s to uid: %s to haiyouId: haiyouId', socketInfo.uid, socketInfo.uid, socketInfo.haiyouId);
                    ws.send(this.wrapResponse(message.payload));
                }
            }
        };
        this.connection = (socket, request) => {
            const haiyouId = request['haiyouId'];
            const tunnelId = request['tunnelId'];
            const uid = request['uid'];
            console.log('[WebSocket] User %s connected. Tunnel id: %s. Haiyou Id: %s', uid, tunnelId, haiyouId);
            socket.on('message', this.handleMessage(socket, uid, haiyouId));
            socket.on('error', this.handleError(socket));
            this.clients.set(socket, { tunnelId, uid: `uid:${uid}`, haiyouId: `haiyouId:${haiyouId}` });
        };
        this.handleMessage = (socket, uid, haiyouId) => {
            return rawMessage => {
                if (rawMessage === 'ping') {
                    return this.handlePing(socket);
                }
                let message;
                try {
                    message = JSON.parse(rawMessage);
                    this.handleMultiMessage(message, uid, haiyouId);
                }
                catch (e) {
                    return console.log(e);
                }
                console.log('[Websocket] Recieve message:', rawMessage);
            };
        };
        this.handleError = socket => {
            return e => {
                console.log('[Websocket] Error occured:', e);
            };
        };
        this.handlePing = socket => {
            socket.send('pong');
        };
        this.wrapResponse = data => {
            return data instanceof Error ? this.wrapErrorResponse(data) : JSON.stringify(data);
        };
        this.wrapErrorResponse = (error) => {
            return JSON.stringify({
                action: 'error',
                message: error.message
            });
        };
        options.verifyClient = options.verifyClient || this.verifyClient;
        options.clientTracking = true;
        this.wss = new ws_1.Server(options);
        this.wss.on('connection', this.connection);
        redis_1.subscriber.on('broadcast', this.handleBroadcast);
    }
    handleMultiMessage(message, uid, haiyouId) {
        switch (message.action) {
            case Action.SENDBARRAGE:
                this.dealBarrage(message.payload, uid, haiyouId);
                break;
            case Action.SENDMESSAGE:
                this.dealMessage(message.payload, uid);
                break;
        }
    }
    dealBarrage(payload, uid, haiyouId) {
        return __awaiter(this, void 0, void 0, function* () {
            const barrageMessage = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                resolve(yield _models_1.Barrage.saveBarrage(uid, payload.text, parseInt(haiyouId, 10), payload.videoTime, payload.fontColor, payload.fontSize));
            }));
            this.broadcast([`haiyouId:${haiyouId}`], { payload: barrageMessage, action: Action.RECEIVEBARRAGE });
        });
    }
    dealMessage(payload, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatMessage = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                new _models_1.Chat({ user_id: parseInt(uid, 10), suser_id: parseInt(payload.suser_id, 10), content: payload.content, is_read: false }).save(null, { method: 'insert' }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield _models_1.Chat.getChat(result.get('id')));
                }));
            }));
            this.broadcast([`uid:${chatMessage['suser_id']}`, `uid:${chatMessage['user_id']}`], { payload: chatMessage, action: Action.RECEIVEMESSAGE });
        });
    }
    verifyClient(info, callback) {
        if (/^\/haiyou\/[0-9]*\/[0-9a-z-]*$/.test(info.req.url)) {
            const urlArr = info.req.url.split('/');
            const haiyouId = urlArr[2];
            const tunnelId = urlArr[urlArr.length - 1];
            util_1.promisify(redis_1.default.get).bind(redis_1.default)(`tunnel:${tunnelId}`).then(res => {
                if (res === null) {
                    console.log('[Websocket] Invalid tunnel url connecting: ', tunnelId);
                    throw new Error('Invalid tunnel url');
                }
                return res;
            }).then(uid => {
                info.req['haiyouId'] = haiyouId;
                info.req['tunnelId'] = tunnelId;
                info.req['uid'] = uid;
                redis_1.default.del(`tunnel:${tunnelId}`);
                callback(true);
            })
                .catch(e => callback(false, 500, e));
        }
        else if (/^\/chat\/[0-9a-z-]*$/.test(info.req.url)) {
            const urlArr = info.req.url.split('/');
            const tunnelId = urlArr[urlArr.length - 1];
            util_1.promisify(redis_1.default.get).bind(redis_1.default)(`tunnel:${tunnelId}`).then(res => {
                if (res === null) {
                    console.log('[Websocket] Invalid tunnel url connecting: ', tunnelId);
                    throw new Error('Invalid tunnel url');
                }
                if (res === 0) {
                    throw new Error('User Not Login');
                }
                return res;
            }).then(uid => {
                info.req['haiyouId'] = 0;
                info.req['tunnelId'] = tunnelId;
                info.req['uid'] = uid;
                redis_1.default.del(`tunnel:${tunnelId}`);
                callback(true);
            })
                .catch(e => callback(false, 401, e));
        }
        else {
            callback(false, 500, `[Websocket] Invalid url cinnecting: ${info.req.url}`);
        }
    }
}
exports.default = WebSocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dlYnNvY2tldC9zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJCQUFxRTtBQUVyRSwrQkFBZ0M7QUFDaEMscUNBQXlDO0FBQ3pDLHVDQUEwRDtBQUMxRCxxQ0FBdUM7QUFRdkMsSUFBSyxNQUtKO0FBTEQsV0FBSyxNQUFNO0lBQ1AscUNBQTJCLENBQUE7SUFDM0IscUNBQTJCLENBQUE7SUFDM0IsMkNBQWlDLENBQUE7SUFDakMsMkNBQWlDLENBQUE7QUFDckMsQ0FBQyxFQUxJLE1BQU0sS0FBTixNQUFNLFFBS1Y7QUFPRDtJQU1JLFlBQWEsT0FBc0I7UUFKbkMsUUFBRyxHQUFXLElBQUksQ0FBQTtRQUVsQixZQUFPLEdBQWdDLElBQUksT0FBTyxFQUFFLENBQUE7UUFnQjdDLGNBQVMsR0FBRyxDQUFDLE9BQWlCLEVBQUUsSUFHdEMsRUFBRSxFQUFFO1lBQ0QsTUFBTSxPQUFPLEdBQUc7Z0JBQ1osT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQTtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1lBRXRFLGlCQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUNuRCxDQUFDLENBQUE7UUFFTyxvQkFBZSxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO1lBQzdDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsbUJBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7WUFDM0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRXBDLEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUN2QyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6RixPQUFPLENBQUMsR0FBRyxDQUFDLCtEQUErRCxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7b0JBQ2pJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtpQkFDOUM7YUFDSjtRQUNMLENBQUMsQ0FBQTtRQUdPLGVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUF3QixFQUFFLEVBQUU7WUFDdEQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3BDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNwQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2REFBNkQsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBRW5HLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO1lBQy9ELE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFlBQVksUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQy9GLENBQUMsQ0FBQTtRQUVPLGtCQUFhLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQzlDLE9BQU8sVUFBVSxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksVUFBVSxLQUFLLE1BQU0sRUFBRTtvQkFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2lCQUNqQztnQkFFRCxJQUFJLE9BQW9CLENBQUE7Z0JBRXhCLElBQUk7b0JBQ0EsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7b0JBQ2hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO2lCQUNsRDtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDUixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQ3hCO2dCQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFFM0QsQ0FBQyxDQUFBO1FBQ0wsQ0FBQyxDQUFBO1FBeUJPLGdCQUFXLEdBQUcsTUFBTSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxDQUFDLENBQUMsRUFBRTtnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ2hELENBQUMsQ0FBQTtRQUNMLENBQUMsQ0FBQTtRQUVPLGVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRTtZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQTtRQUVPLGlCQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEYsQ0FBQyxDQUFBO1FBRU8sc0JBQWlCLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2xCLE1BQU0sRUFBRSxPQUFPO2dCQUNmLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzthQUN6QixDQUFDLENBQUE7UUFDTixDQUFDLENBQUE7UUFqSEcsT0FBTyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUE7UUFDaEUsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUE7UUFFN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFdBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRTFDLGtCQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQThETyxrQkFBa0IsQ0FBRSxPQUFvQixFQUFFLEdBQUcsRUFBRSxRQUFRO1FBQzNELFFBQVEsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNwQixLQUFLLE1BQU0sQ0FBQyxXQUFXO2dCQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUNoRCxNQUFLO1lBQ1QsS0FBSyxNQUFNLENBQUMsV0FBVztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUN0QyxNQUFLO1NBQ1o7SUFDTCxDQUFDO0lBQ1ksV0FBVyxDQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUTs7WUFDNUMsTUFBTSxjQUFjLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDL0QsT0FBTyxDQUFDLE1BQU0saUJBQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFDekksQ0FBQyxDQUFBLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBRSxZQUFZLFFBQVEsRUFBRSxDQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQTtRQUMxRyxDQUFDO0tBQUE7SUFDWSxXQUFXLENBQUUsT0FBTyxFQUFFLEdBQUc7O1lBQ2xDLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzVELElBQUksY0FBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtvQkFDaEwsT0FBTyxDQUFDLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDakQsQ0FBQyxDQUFBLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQSxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUUsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQTtRQUNsSixDQUFDO0tBQUE7SUFzQk8sWUFBWSxDQUFFLElBQThCLEVBQUUsUUFBaUU7UUFHbkgsSUFBSSxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzFDLGdCQUFTLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsQ0FBQyxVQUFVLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM5RCxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7b0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxRQUFRLENBQUMsQ0FBQTtvQkFDcEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO2lCQUN4QztnQkFDRCxPQUFPLEdBQUcsQ0FBQTtZQUNkLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtnQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUE7Z0JBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFBO2dCQUNyQixlQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2xCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3ZDO2FBQU0sSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDMUMsZ0JBQVMsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxDQUFDLFVBQVUsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzlELElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtvQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLFFBQVEsQ0FBQyxDQUFBO29CQUNwRSxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUE7aUJBQ3hDO2dCQUNELElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtvQkFDWCxNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7aUJBQ3BDO2dCQUNELE9BQU8sR0FBRyxDQUFBO1lBQ2QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtnQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUE7Z0JBQ3JCLGVBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxRQUFRLEVBQUUsQ0FBQyxDQUFBO2dCQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDdkM7YUFBTTtZQUNILFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLHVDQUF1QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7U0FDOUU7SUFDTCxDQUFDO0NBQ0o7QUF4S0QsNEJBd0tDIn0=