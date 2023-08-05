const assetsService = require("../services/assets.service");
const { errorResponse } = require("../utils/error");
module.exports = {
  async uploadFiles(req, res) {
    try {
      const { files } = req;
      const result = await assetsService.uploadFiles(files);
      return res.send(result);
    } catch (error) {
      console.log("could not upload file to s3 bucket", err);
      return errorResponse({
        req,
        res,
        error,
        defaultMessage: "could not upload file to s3 bucket",
      });
    }
  },
  async deleteFiles(req, res) {
    try {
      const { filePaths = [] } = req.body;
      const result = await assetsService.deleteFiles(filePaths);
      return res.send(result);
    } catch (error) {
      console.log("could not delete file to s3 bucket", err);
      return errorResponse({
        req,
        res,
        error,
        defaultMessage: "could not delete file to s3 bucket",
      });
    }
  },
  async fetchFile(req, res) {
    try {
      const { filePath } = req.query;
      const result = await assetsService.fetchFile(filePath);
      return res.send(result);
    } catch (error) {
      console.log("could not fetch file to s3 bucket", err);
      return errorResponse({
        req,
        res,
        error,
        defaultMessage: "could not fetch file to s3 bucket",
      });
    }
  },
};
