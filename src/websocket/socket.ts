import { Server, ServerOptions, VerifyClientCallbackAsync } from 'ws'
import { IncomingMessage } from 'http'
import { promisify } from 'util'
import { syncTryCatch } from '@libs/util'
import redis, { subscriber, publisher } from '@libs/redis'
import { Chat, Barrage } from '@models'

type TunnelInfo = {
    tunnelId: string
    uid: string
    haiyouId?: string
}

enum Action {
    SENDMESSAGE = 'sendMessage',
    SENDBARRAGE = 'sendBarrage',
    RECEIVEMESSAGE = 'receiveMessage',
    RECEIVEBARRAGE = 'receiveBarrage'
}

export interface MessageType {
    action: string
    payload: any
}

export default class WebSocket {

    wss: Server = null

    clients: WeakMap<Object, TunnelInfo> = new WeakMap()

    constructor (options: ServerOptions) {
        // default props set
        options.verifyClient = options.verifyClient || this.verifyClient
        options.clientTracking = true

        this.wss = new Server(options)

        this.wss.on('connection', this.connection)

        subscriber.on('broadcast', this.handleBroadcast)
    }
    /**
     * @param targets[] `uid:${uid}` || `haiyouId:${haiyouId}`
     */
    public broadcast = (targets: string[], data: {
        action: string
        payload: any
    }) => {
        const message = {
            targets: [...new Set(targets)],
            payload: data
        }

        console.log('[Websocket] Broadcast task: %s', JSON.stringify(message))

        publisher('broadcast', JSON.stringify(message))
    }

    private handleBroadcast = (rawMessage: string) => {
        const [message, err] = syncTryCatch(JSON.parse(rawMessage))
        const ids = new Set(message.targets)

        for (const ws of this.wss.clients) {
            const socketInfo = this.clients.get(ws)
            if (ids.has(socketInfo.tunnelId) || ids.has(socketInfo.uid) || ids.has(socketInfo.haiyouId)) {
                console.log('[Websocket] Push message: %s to uid: %s to haiyouId: haiyouId', socketInfo.uid, socketInfo.uid, socketInfo.haiyouId)
                ws.send(this.wrapResponse(message.payload))
            }
        }
    }

    // handler connections
    private connection = (socket, request: IncomingMessage) => {
        const haiyouId = request['haiyouId']
        const tunnelId = request['tunnelId']
        const uid = request['uid']
        console.log('[WebSocket] User %s connected. Tunnel id: %s. Haiyou Id: %s', uid, tunnelId, haiyouId)

        socket.on('message', this.handleMessage(socket, uid, haiyouId))
        socket.on('error', this.handleError(socket))
        this.clients.set(socket, { tunnelId, uid: `uid:${uid}`, haiyouId: `haiyouId:${haiyouId}` })
    }

    private handleMessage = (socket, uid, haiyouId) => {
        return rawMessage => {
            if (rawMessage === 'ping') {
                return this.handlePing(socket)
            }

            let message: MessageType

            try {
                message = JSON.parse(rawMessage)
                this.handleMultiMessage(message, uid, haiyouId)
            } catch (e) {
                return console.log(e)
            }

            console.log('[Websocket] Recieve message:', rawMessage)
            // return MicroService[message.action](socket, message.payload, message.requestId, uid, this.wss)
        }
    }
    private handleMultiMessage (message: MessageType, uid, haiyouId) {
        switch (message.action) {
            case Action.SENDBARRAGE:
                this.dealBarrage(message.payload, uid, haiyouId)
                break
            case Action.SENDMESSAGE:
                this.dealMessage(message.payload, uid)
                break
        }
    }
    public async dealBarrage (payload, uid, haiyouId) {
        const barrageMessage = await new Promise(async (resolve, reject) => {
            resolve(await Barrage.saveBarrage(uid, payload.text, parseInt(haiyouId, 10), payload.videoTime, payload.fontColor, payload.fontSize))
        })
        this.broadcast([ `haiyouId:${haiyouId}` ], { payload: barrageMessage, action: Action.RECEIVEBARRAGE })
    }
    public async dealMessage (payload, uid) {
        const chatMessage = await new Promise(async (resolve, reject) => {
            new Chat({ user_id: parseInt(uid, 10), suser_id: parseInt(payload.suser_id, 10), content: payload.content, is_read: false }).save(null, { method: 'insert' }).then(async (result) => {
                resolve(await Chat.getChat(result.get('id')))
            })
        })
        this.broadcast([ `uid:${chatMessage['suser_id']}`, `uid:${chatMessage['user_id']}` ], { payload: chatMessage, action: Action.RECEIVEMESSAGE })
    }
    private handleError = socket => {
        return e => {
            console.log('[Websocket] Error occured:', e)
        }
    }

    private handlePing = socket => {
        socket.send('pong')
    }

    private wrapResponse = data => {
        return data instanceof Error ? this.wrapErrorResponse(data) : JSON.stringify(data)
    }

    private wrapErrorResponse = (error: Error) => {
        return JSON.stringify({
            action: 'error',
            message: error.message
        })
    }

    private verifyClient (info: { req: IncomingMessage }, callback: (res: boolean, code?: number, message?: string) => void) {
        // /haiyou/videoId/tunnelId
        // /chat/tunnelId
        if (/^\/haiyou\/[0-9]*\/[0-9a-z-]*$/.test(info.req.url)) {
            const urlArr = info.req.url.split('/')
            const haiyouId = urlArr[2]
            const tunnelId = urlArr[urlArr.length - 1]
            promisify(redis.get).bind(redis)(`tunnel:${tunnelId}`).then(res => {
                if (res === null) {
                    console.log('[Websocket] Invalid tunnel url connecting: ', tunnelId)
                    throw new Error('Invalid tunnel url')
                }
                return res
            }).then(uid => {
                info.req['haiyouId'] = haiyouId
                info.req['tunnelId'] = tunnelId
                info.req['uid'] = uid
                redis.del(`tunnel:${tunnelId}`)
                callback(true)
            })
            .catch(e => callback(false, 500, e))
        } else if (/^\/chat\/[0-9a-z-]*$/.test(info.req.url)) {
            const urlArr = info.req.url.split('/')
            const tunnelId = urlArr[urlArr.length - 1]
            promisify(redis.get).bind(redis)(`tunnel:${tunnelId}`).then(res => {
                if (res === null) {
                    console.log('[Websocket] Invalid tunnel url connecting: ', tunnelId)
                    throw new Error('Invalid tunnel url')
                }
                if (res === 0) {
                    throw new Error('User Not Login')
                }
                return res
            }).then(uid => {
                info.req['haiyouId'] = 0
                info.req['tunnelId'] = tunnelId
                info.req['uid'] = uid
                redis.del(`tunnel:${tunnelId}`)
                callback(true)
            })
            .catch(e => callback(false, 401, e))
        } else {
            callback(false, 500, `[Websocket] Invalid url cinnecting: ${info.req.url}`)
        }
    }
}
