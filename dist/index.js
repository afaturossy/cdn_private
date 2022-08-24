"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
const controller_1 = require("./controller");
const database_1 = __importDefault(require("./database"));
const PORT = process.env.PORT || process.argv[2] || "8000";
const app = (0, express_1.default)();
console.log(process.argv);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url || "";
    // pengecekan datafile exist
    const r = yield database_1.default.findOne({ where: { url: url } });
    if (r) {
        const filePath = path_1.default.resolve(r.path);
        res.setHeader("Cache-Control", 'public, max-age=2592000');
        res.sendFile(filePath);
    }
    else {
        const filePath = `public/${(0, crypto_1.randomUUID)()}.jpg`;
        (0, controller_1.reqFile)(req, res, filePath);
    }
}));
app.listen(PORT, () => console.log(`server run in ${PORT}`));
