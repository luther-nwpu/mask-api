"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const util_1 = require("util");
const util_2 = require("@libs/util");
const redis_1 = require("@libs/redis");
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
                if (ids.has(socketInfo.tunnelId) || ids.has(socketInfo.uid)) {
                    console.log('[Websocket] Push message: %s to uid: %s', JSON.stringify(message.payload), socketInfo.uid);
                    ws.send(this.wrapResponse(message.payload));
                }
            }
        };
        this.connection = (socket, request) => {
            const tunnelId = request['tunnelId'];
            const uid = request['user'].user_id;
            console.log('[WebSocket] User %s connected. Tunnel id:', uid, tunnelId);
            socket.on('message', this.handleMessage(socket, uid));
            socket.on('error', this.handleError(socket));
            this.clients.set(socket, { tunnelId, uid });
        };
        this.handleMessage = (socket, uid) => {
            return rawMessage => {
                if (rawMessage === 'ping') {
                    return this.handlePing(socket);
                }
                let message;
                try {
                    message = JSON.parse(rawMessage);
                }
                catch (e) {
                    return console.log(e);
                }
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
    verifyClient(info, callback) {
        const urlArr = info.req.url.split('/');
        const tunnelId = urlArr[urlArr.length - 1];
        util_1.promisify(redis_1.default.get).bind(redis_1.default)(`tunnel:${tunnelId}`).then(res => {
            if (res === null) {
                console.log('[Websocket] Invalid tunnel url connecting: ', tunnelId);
                throw new Error('Invalid tunnel url');
            }
            return;
        }).then(userinfo => {
            if (!userinfo) {
                console.log('[Websocket] Invalid user connecting.');
                throw new Error('Invalid user');
            }
            info.req['tunnelId'] = tunnelId;
            info.req['user'] = userinfo.toJSON();
            redis_1.default.del(`tunnel:${tunnelId}`);
            callback(true);
        }).catch(e => callback(false, 401, e.message));
    }
}
exports.default = WebSocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dlYnNvY2tldC9zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBcUU7QUFFckUsK0JBQWdDO0FBQ2hDLHFDQUF5QztBQUN6Qyx1Q0FBMEQ7QUFhMUQ7SUFNSSxZQUFhLE9BQXNCO1FBSm5DLFFBQUcsR0FBVyxJQUFJLENBQUE7UUFFbEIsWUFBTyxHQUFnQyxJQUFJLE9BQU8sRUFBRSxDQUFBO1FBYzdDLGNBQVMsR0FBRyxDQUFDLE9BQWlCLEVBQUUsSUFHdEMsRUFBRSxFQUFFO1lBQ0QsTUFBTSxPQUFPLEdBQUc7Z0JBQ1osT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQTtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1lBRXRFLGlCQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUNuRCxDQUFDLENBQUE7UUFFTyxvQkFBZSxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO1lBQzdDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsbUJBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7WUFDM0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRXBDLEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUV2QyxJQUFJLEdBQUcs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