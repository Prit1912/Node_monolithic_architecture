const { s3UploadBlob, s3Delete, s3SignedGetUrl } = require("../utils/aws");

module.exports = {
  async uploadFiles(files) {
    try {
      const uploadUrls = [];
      for (const file of Object.keys(files)) {
        const fileToUpload = files[file];
        const { name, mimetype, data } = fileToUpload;
        const filePath = `demo-upload/${name}`;
        const fileType = mimetype;
        const base64Data = Buffer.from(data).toString("base64");
        const url = await s3UploadBlob({
          filePath,
          fileType,
          data: base64Data,
        });
        uploadUrls.push(url);
      }
      console.log("Files uploaded successfully");
      return uploadUrls;
    } catch (error) {
      console.log(error);
      throw error
    }
  },
  async deleteFiles(filePaths) {
    try {
      for (const filePath of filePaths) {
        await s3Delete(filePath);
        console.log("file deleted successfully");
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  },
  async fetchFile(filePath) {
    try {
      const data = await s3SignedGetUrl(filePath);
      return data;
    } catch (error) {
      console.log(error);
      throw error
    }
  },
};
