const express = require("express");
const assetsController = require("../controllers/assets.controller");

const assetsRouter = express.Router();

assetsRouter.post("/upload-files", assetsController.uploadFiles);
assetsRouter.post("/delete-files", assetsController.deleteFiles);
assetsRouter.get("/fetch-file", assetsController.fetchFile);

module.exports = assetsRouter;
