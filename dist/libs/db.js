"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = require("@config");
const knex = require("knex");
const bookshelf = require("bookshelf");
exports.db = knex({
    client: 'mysql',
    connection: {
        host: _config_1.MYSQL.HOST,
        port: _config_1.MYSQL.PORT,
        user: _config_1.MYSQL.USER,
        password: _config_1.MYSQL.PASS,
        database: _config_1.MYSQL.DB,
        charset: _config_1.MYSQL.CHAR,
        timezone: '+08:00'
    }
});
exports.default = bookshelf(exports.db);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlicy9kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUErQjtBQUMvQiw2QkFBNEI7QUFDNUIsdUNBQXNDO0FBRXpCLFFBQUEsRUFBRSxHQUFHLElBQUksQ0FBQztJQUNuQixNQUFNLEVBQUUsT0FBTztJQUNmLFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxlQUFLLENBQUMsSUFBSTtRQUNoQixJQUFJLEVBQUUsZUFBSyxDQUFDLElBQUk7UUFDaEIsSUFBSSxFQUFFLGVBQUssQ0FBQyxJQUFJO1FBQ2hCLFFBQVEsRUFBRSxlQUFLLENBQUMsSUFBSTtRQUNwQixRQUFRLEVBQUUsZUFBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxFQUFFLGVBQUssQ0FBQyxJQUFJO1FBQ25CLFFBQVEsRUFBRSxRQUFRO0tBQ3JCO0NBQ0osQ0FBQyxDQUFBO0FBRUYsa0JBQWUsU0FBUyxDQUFDLFVBQUUsQ0FBQyxDQUFBIn0=