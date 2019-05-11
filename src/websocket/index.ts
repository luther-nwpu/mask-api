import Websocket from '@websocket/socket'

let instance: Websocket = null

export default function (opts = {}) {
    if (!instance) {
        instance = new Websocket(opts)
    }

    return instance
}
