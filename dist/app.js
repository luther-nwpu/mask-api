"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const xmlParse = require("koa-xml-body");
const http_1 = require("http");
const KoaBody = require("koa-bodyparser");
const KoaCors = require("@koa/cors");
const debug = require("debug");
const FileKoaBody = require("koa-body");
const _config_1 = require("@config");
const _middlewares_1 = require("@middlewares");
const _websocket_1 = require("@websocket");
const _routes_1 = require("@routes");
const path = require("path");
const app = new Koa();
_middlewares_1.jwtMiddleware.forEach((value) => {
    app.use(value);
});
app.use(require('koa-static')(path.dirname('../')));
app
    .use(FileKoaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 1000 * 1024 * 1024
    }
}))
    .use(KoaCors())
    .use(xmlParse({ xmlOptions: { explicitArray: false } }))
    .use(KoaBody())
    .use(_middlewares_1.errorCatcher)
    .use(_routes_1.haiyouRouter.routes())
    .use(_routes_1.haiyouRouter.allowedMethods())
    .use(_routes_1.authRouter.routes())
    .use(_routes_1.authRouter.allowedMethods())
    .use(_routes_1.adminRouter.routes())
    .use(_routes_1.adminRouter.allowedMethods())
    .use(_routes_1.commonRouter.routes())
    .use(_routes_1.commonRouter.allowedMethods())
    .use(_routes_1.uploadRouter.routes())
    .use(_routes_1.uploadRouter.allowedMethods())
    .use(_routes_1.draftsRouter.routes())
    .use(_routes_1.draftsRouter.allowedMethods())
    .use(_routes_1.socketRouter.routes())
    .use(_routes_1.socketRouter.allowedMethods())
    .use(_routes_1.barrageRouter.routes())
    .use(_routes_1.barrageRouter.allowedMethods())
    .use(_routes_1.chatRouter.routes())
    .use(_routes_1.chatRouter.allowedMethods())
    .use(_routes_1.commentRouter.routes())
    .use(_routes_1.commentRouter.allowedMethods())
    .use(_routes_1.videoRouter.routes())
    .use(_routes_1.videoRouter.allowedMethods())
    .use(_routes_1.historyRouter.routes())
    .use(_routes_1.historyRouter.allowedMethods())
    .use(_routes_1.subscriberRouter.routes())
    .use(_routes_1.subscriberRouter.allowedMethods());
const server = http_1.createServer(app.callback());
_websocket_1.default({ server });
server.listen(_config_1.PORT, () => {
    const debugInfo = `✅ App starting at http://127.0.0.1:${_config_1.PORT}/`;
    _config_1.IS_PROD
        ? console.log(debugInfo)
        : debug(_config_1.DEBUG_NAMESPACE.FRAMEWORK)(debugInfo);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUEwQjtBQUMxQix5Q0FBd0M7QUFDeEMsK0JBQW1DO0FBQ25DLDBDQUF5QztBQUN6QyxxQ0FBb0M7QUFDcEMsK0JBQThCO0FBQzlCLHdDQUF1QztBQUN2QyxxQ0FBd0Q7QUFDeEQsK0NBQTBEO0FBQzFELDJDQUFrQztBQUNsQyxxQ0FBK007QUFDL00sNkJBQTRCO0FBRTVCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFFckIsNEJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2xCLENBQUMsQ0FBQyxDQUFBO0FBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFFbkQsR0FBRztLQUNFLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDYixTQUFTLEVBQUUsSUFBSTtJQUNmLFVBQVUsRUFBRTtRQUNSLGFBQWEsRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUk7S0FDcEM7Q0FDSixDQUFDLENBQUM7S0FDRixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDZCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN2RCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDZCxHQUFHLENBQUMsMkJBQVksQ0FBQztLQUNqQixHQUFHLENBQUMsc0JBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMxQixHQUFHLENBQUMsc0JBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNsQyxHQUFHLENBQUMsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN4QixHQUFHLENBQUMsb0JBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNoQyxHQUFHLENBQUMscUJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN6QixHQUFHLENBQUMscUJBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNqQyxHQUFHLENBQUMsc0JBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMxQixHQUFHLENBQUMsc0JBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNsQyxHQUFHLENBQUMsc0JBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMxQixHQUFHLENBQUMsc0JBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNsQyxHQUFHLENBQUMsc0JBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMxQixHQUFHLENBQUMsc0JBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNsQyxHQUFHLENBQUMsc0JBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMxQixHQUFHLENBQUMsc0JBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNsQyxHQUFHLENBQUMsdUJBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMzQixHQUFHLENBQUMsdUJBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNuQyxHQUFHLENBQUMsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN4QixHQUFHLENBQUMsb0JBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNoQyxHQUFHLENBQUMsdUJBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMzQixHQUFHLENBQUMsdUJBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNuQyxHQUFHLENBQUMscUJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN6QixHQUFHLENBQUMscUJBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNqQyxHQUFHLENBQUMsdUJBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMzQixHQUFHLENBQUMsdUJBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNuQyxHQUFHLENBQUMsMEJBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDOUIsR0FBRyxDQUFDLDBCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7QUFDM0MsTUFBTSxNQUFNLEdBQUcsbUJBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUUzQyxvQkFBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtBQUVyQixNQUFNLENBQUMsTUFBTSxDQUNULGNBQUksRUFDSixHQUFHLEVBQUU7SUFDRCxNQUFNLFNBQVMsR0FBRyxzQ0FBc0MsY0FBSSxHQUFHLENBQUE7SUFFL0QsaUJBQU87UUFDSCxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ3JELENBQUMsQ0FDSixDQUFBIn0=