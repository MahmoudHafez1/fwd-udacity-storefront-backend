"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const productRoutes_1 = __importDefault(require("./handlers/productRoutes"));
const userRoutes_1 = __importDefault(require("./handlers/userRoutes"));
const orderRoutes_1 = __importDefault(require("./handlers/orderRoutes"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT;
exports.app.use(body_parser_1.default.json());
exports.app.get("/", function (req, res) {
    res.send("Hello World!");
});
(0, productRoutes_1.default)(exports.app);
(0, userRoutes_1.default)(exports.app);
(0, orderRoutes_1.default)(exports.app);
exports.app.listen(port, function () {
    console.log(`starting app on: ${port}`);
});
