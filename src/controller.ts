import https from "https";
import { Request, Response } from "express";

import fs from "fs";
import DATAFILE from "./database";

const reqFile = (req: Request, res: Response, filePath: string) => {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Mobile Safari/537.36 Edg/103.0.1264.77",
  };
  const { url } = req.query;
  if (url && typeof url === "string") {
    const newurl = url.replace("http://", "https://");

    const file = fs.createWriteStream(filePath);

    const request = https.get(
      newurl,
      { headers: headers },
      function (response) {
        if (response.statusCode !== 200) {
          fs.unlink(filePath, () => {
            new Error(`Failed to get '${url}' (${response.statusCode})`);
          });

          res.send(null);
          return;
        }

        const contentType = response.headers["content-type"];

        console.log(`add-- ${new Date().toString()} -> ${newurl}`);

        if (typeof contentType === "string")
          res.setHeader("Content-Type", contentType);
          res.setHeader("Cache-Control",'public, max-age=2592000')

        response.pipe(res);
        response.pipe(file);
        addDB({ url: url, path: filePath });
      }
    );
    file.on("finish", () => {
      
    });

    request.on("error", function (e: Error) {
      fs.unlink(filePath, () => {
        console.error(e);
      });
    });
  }
};

const addDB = async (data: { url: string; path: string }) => {
  await DATAFILE.create(data);
};

export { reqFile };
