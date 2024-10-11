import { CreateShortUrl } from "../controller/urlController.js";
import { GetOriginalUrl } from "../controller/urlController.js";

import express from "express";
const router = express.Router();

router.post("/shorten", CreateShortUrl);
router.get("/:slug", GetOriginalUrl);

export default router;