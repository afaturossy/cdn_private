"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const controller_1 = require("./controller");
const PORT = process.env.PORT || "8000";
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    const filePath = `public/${(0, crypto_1.randomUUID)()}.jpg`;
    (0, controller_1.reqFile)(req, res, filePath);
});
app.listen(PORT, () => console.log(`server run in ${PORT}`));
