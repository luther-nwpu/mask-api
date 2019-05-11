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
const _routes_1 = require("@routes");
const path = require("path");
const app = new Koa();
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
    .use(_routes_1.blogRouter.routes())
    .use(_routes_1.blogRouter.allowedMethods())
    .use(_routes_1.adminRouter.routes())
    .use(_routes_1.adminRouter.allowedMethods())
    .use(_routes_1.commonRouter.routes())
    .use(_routes_1.commonRouter.allowedMethods());
const server = http_1.createServer(app.callback());
server.listen(_config_1.PORT, () => {
    const debugInfo = `✅ App starting at http://127.0.0.1:${_config_1.PORT}/`;
    _config_1.IS_PROD
        ? console.log(debugInfo)
        : debug(_config_1.DEBUG_NAMESPACE.FRAMEWORK)(debugInfo);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUEwQjtBQUMxQix5Q0FBd0M7QUFDeEMsK0JBQW1DO0FBQ25DLDBDQUF5QztBQUN6QyxxQ0FBb0M7QUFDcEMsK0JBQThCO0FBQzlCLHdDQUF1QztBQUN2QyxxQ0FBd0Q7QUFDeEQsK0NBQTBEO0FBRTFELHFDQUErRDtBQUMvRCw2QkFBNEI7QUFFNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUtyQixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUVuRCxHQUFHO0tBQ0UsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUNiLFNBQVMsRUFBRSxJQUFJO0lBQ2YsVUFBVSxFQUFFO1FBQ1IsYUFBYSxFQUFFLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSTtLQUNwQztDQUNKLENBQUMsQ0FBQztLQUNGLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNkLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZELEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNkLEdBQUcsQ0FBQywyQkFBWSxDQUFDO0tBQ2pCLEdBQUcsQ0FBQyxvQkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hCLEdBQUcsQ0FBQyxvQkFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ2hDLEdBQUcsQ0FBQyxxQkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3pCLEdBQUcsQ0FBQyxxQkFBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ2pDLEdBQUcsQ0FBQyxzQkFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQzFCLEdBQUcsQ0FBQyxzQkFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7QUFDdkMsTUFBTSxNQUFNLEdBQUcsbUJBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUkzQyxNQUFNLENBQUMsTUFBTSxDQUNULGNBQUksRUFDSixHQUFHLEVBQUU7SUFDRCxNQUFNLFNBQVMsR0FBRyxzQ0FBc0MsY0FBSSxHQUFHLENBQUE7SUFFL0QsaUJBQU87UUFDSCxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ3JELENBQUMsQ0FDSixDQUFBIn0=