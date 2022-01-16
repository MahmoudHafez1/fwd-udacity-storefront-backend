"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const productRoutes_1 = __importDefault(require("./handlers/productRoutes"));
const userRoutes_1 = __importDefault(require("./handlers/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
(0, productRoutes_1.default)(app);
(0, userRoutes_1.default)(app);
app.listen(port, function () {
    console.log(`starting app on: ${port}`);
});
