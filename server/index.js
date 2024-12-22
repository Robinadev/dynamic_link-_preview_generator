import express from "express";
import { json } from "body-parser";
import cors from "cors";

import { getUrlPreview } from "./url.controller";

const app = express();
const PORT = process.env.SERVER_PORT || 5005;

app.use(json());
app.use(cors());

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "Server Running" });
});
app.post("/preview", getUrlPreview);

app.listen(PORT, () => {
  console.log("Server is running: %s", PORT);
});