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
exports.reqFile = void 0;
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const database_1 = __importDefault(require("./database"));
const reqFile = (req, res, filePath) => {
    const headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Mobile Safari/537.36 Edg/103.0.1264.77",
    };
    const { url } = req.query;
    if (url && typeof url === "string") {
        const newurl = url.replace("http://", "https://");
        const file = fs_1.default.createWriteStream(filePath);
        const request = https_1.default.get(newurl, { headers: headers }, function (response) {
            if (response.statusCode !== 200) {
                fs_1.default.unlink(filePath, () => {
                    new Error(`Failed to get '${url}' (${response.statusCode})`);
                });
                res.send(null);
                return;
            }
            const contentType = response.headers["content-type"];
            console.log(`add-- ${new Date().toString()} -> ${newurl}`);
            if (typeof contentType === "string")
                res.setHeader("Content-Type", contentType);
            res.setHeader("Cache-Control", 'public, max-age=2592000');
            response.pipe(res);
            response.pipe(file);
        });
        file.on("finish", () => {
            addDB({ url: url, path: filePath });
        });
        request.on("error", function (e) {
            fs_1.default.unlink(filePath, () => {
                console.error(e);
            });
        });
    }
};
exports.reqFile = reqFile;
const addDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.create(data);
});
