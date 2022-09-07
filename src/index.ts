import express from "express";
import { randomUUID } from "crypto";
import path from "path";

import { reqFile } from "./controller";
import DATAFILE from "./database";

const PORT = process.env.PORT || process.argv[2] || "8000";
const app = express();
console.log(process.argv)

app.get("/", async (req, res) => {
  const url = req.query.url || "";

  // pengecekan datafile exist
  const r = await DATAFILE.findOne({ where: { url: url } ,order:[["id","DESC"]]});
  if (r) {
    const filePath = path.resolve(r.path)
    res.setHeader("Cache-Control",'public, max-age=2592000')
    res.sendFile(filePath)
  } else {
    const filePath = `public/${randomUUID()}.jpg`;
    reqFile(req, res, filePath);
  }
});

app.listen(PORT, () => console.log(`server run in ${PORT}`));
