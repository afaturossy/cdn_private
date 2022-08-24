import express from "express";
import https from "https";
import { randomUUID } from "crypto";
import { reqFile } from "./controller";

const PORT = process.env.PORT || "8000";
const app = express();

app.get("/", (req, res) => {
  const filePath = `public/${randomUUID()}.jpg`;
  reqFile(req, res, filePath);
});

app.listen(PORT, () => console.log(`server run in ${PORT}`));
