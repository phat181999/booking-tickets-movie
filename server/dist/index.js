"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const bodyParser = require("body-parser");
database_1.default.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/v1", routes_1.default);
app.listen(3000, () => {
    console.log("listen server port", 3000);
});
