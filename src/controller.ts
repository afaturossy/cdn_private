import https from "https";
import { Request, Response } from "express";

import fs from "fs";

const reqFile = (req: Request, res: Response, filePath: string) => {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Mobile Safari/537.36 Edg/103.0.1264.77",
  };
  const { url } = req.query;
  if (url && typeof url === "string") {
    const newurl = url.replace("http://", "https://");

    const file = fs.createWriteStream(filePath);
    let fileInfo: { mime: string; size: number } | null = null;

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
      }
    );
    file.on("finish", () => fileInfo);

    request.on("error", function (e: Error) {
      fs.unlink(filePath, () => {
        console.error(e);
      });
    });
  }
};

export { reqFile };
