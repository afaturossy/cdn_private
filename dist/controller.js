"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqFile = void 0;
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const reqFile = (req, res, filePath) => {
    const headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Mobile Safari/537.36 Edg/103.0.1264.77",
    };
    const { url } = req.query;
    if (url && typeof url === "string") {
        const newurl = url.replace("http://", "https://");
        const file = fs_1.default.createWriteStream(filePath);
        let fileInfo = null;
        const request = https_1.default.get(newurl, { headers: headers }, function (response) {
            if (response.statusCode !== 200) {
                fs_1.default.unlink(filePath, () => {
                    new Error(`Failed to get '${url}' (${response.statusCode})`);
                });
                res.send(null);
                return;
            }
            const contentType = response.headers["content-type"];
            const size = response.headers["content-length"] || "0";
            const t = contentType || "image/jpeg";
            console.log(`${newurl} - ${t}`);
            fileInfo = {
                mime: t,
                size: parseInt(size, 10),
            };
            res.setHeader("Content-Type", t);
            response.pipe(res);
            response.pipe(file);
        });
        file.on("finish", () => fileInfo);
        request.on("error", function (e) {
            fs_1.default.unlink(filePath, () => {
                console.error(e);
            });
        });
    }
};
exports.reqFile = reqFile;
