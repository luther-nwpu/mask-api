"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const _config_1 = require("@config");
const events_1 = require("events");
const instance = redis.createClient({
    host: _config_1.REDIS.HOST,
    port: _config_1.REDIS.PORT
});
class Subscriber {
    constructor() {
        this.eventEmitter = new events_1.EventEmitter();
        this.onMessage = (channel, message) => {
            this.eventEmitter.emit(channel, message);
        };
        this.instance = redis.createClient({
            host: _config_1.REDIS.HOST,
            port: _config_1.REDIS.PORT
        });
        this.instance.on('message', this.onMessage);
    }
    on(channel, cb) {
        console.log(`[redis] add listener to channel:`, channel);
        this.eventEmitter.addListener(channel, cb);
        this.instance.subscribe(channel);
    }
    off(channel, cb) {
        this.eventEmitter.removeListener(channel, cb);
        this.instance.unsubscribe(channel);
    }
}
exports.default = instance;
exports.subscriber = new Subscriber();
exports.publisher = (channel, message) => {
    redis.createClient({
        host: _config_1.REDIS.HOST,
        port: _config_1.REDIS.PORT
    }).publish(channel, message);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9yZWRpcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE4QjtBQUM5QixxQ0FBK0I7QUFDL0IsbUNBQXFDO0FBRXJDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDaEMsSUFBSSxFQUFFLGVBQUssQ0FBQyxJQUFJO0lBQ2hCLElBQUksRUFBRSxlQUFLLENBQUMsSUFBSTtDQUNuQixDQUFDLENBQUE7QUFFRjtJQU1JO1FBRlEsaUJBQVksR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQTtRQVd6QyxjQUFTLEdBQUcsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzVDLENBQUMsQ0FBQTtRQVZHLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztZQUMvQixJQUFJLEVBQUUsZUFBSyxDQUFDLElBQUk7WUFDaEIsSUFBSSxFQUFFLGVBQUssQ0FBQyxJQUFJO1NBQ25CLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQU1ELEVBQUUsQ0FBRSxPQUFlLEVBQUUsRUFBNkI7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN4RCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVELEdBQUcsQ0FBRSxPQUFlLEVBQUUsRUFBNkI7UUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3RDLENBQUM7Q0FDSjtBQUVELGtCQUFlLFFBQVEsQ0FBQTtBQUVWLFFBQUEsVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUE7QUFFN0IsUUFBQSxTQUFTLEdBQUcsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDMUQsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUNmLElBQUksRUFBRSxlQUFLLENBQUMsSUFBSTtRQUNoQixJQUFJLEVBQUUsZUFBSyxDQUFDLElBQUk7S0FDbkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBIn0=