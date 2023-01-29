const AWS = require("aws-sdk");
const axios = require("axios");
const config = require("../../config");

const {
  AWS_DEFAULT_REGION,
  S3_BUCKET_PRIVATE,
  AWS_APP_USER_ACCESS_KEY,
  AWS_APP_USER_SECRET_ACCESS_KEY,
} = config;

AWS.config.region = AWS_DEFAULT_REGION;

AWS.config.update({
  accessKeyId: AWS_APP_USER_ACCESS_KEY,
  secretAccessKey: AWS_APP_USER_SECRET_ACCESS_KEY,
});

const ONE_DAY_IN_SEC = 60 * 60 * 24;

const fileUrlFromPath = ({ filePath = "", bucket = S3_BUCKET_PRIVATE }) =>
  `https://${bucket}.s3.amazonaws.com/${filePath}`;

const s3Uploader = (filePath, fileType) => {
  const S3 = new AWS.S3({ signatureVersion: "v4" });
  return new Promise((resolve, reject) => {
    S3.getSignedUrl(
      "putObject",
      {
        Bucket: S3_BUCKET_PRIVATE,
        Key: filePath,
        Expires: 300,
        ContentType: fileType,
      },
      (err, requestUrl) => {
        if (err) {
          reject(err);
        }
        if (requestUrl) {
          resolve({ requestUrl, fileUrl: fileUrlFromPath({ filePath }) });
        }
      }
    );
  });
};

const s3UploadBlob = async ({ filePath, fileType, data }) => {
  let uploadURL;
  let finalURL;
  try {
    const result = await s3Uploader(filePath, fileType);
    uploadURL = result.requestUrl;
    finalURL = result.fileUrl;
  } catch (error) {
    console.log("Could not upload to S3", error);
    throw error;
  }
  const buffer = Buffer.from(data, "base64");
  try {
    await axios.put(uploadURL, buffer, {
      headers: { "Content-Type": fileType },
    });
    return { filePath, finalURL };
  } catch (error) {
    console.log("Could not buffer upload to S3", error);
    throw error;
  }
};

/*
 * Get a secure url to access an S3 file.
 * Ensure user is authenticated and has permission before accessing this.
 */
const s3SignedGetUrl = async (filePath) => {
  const S3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    S3.getSignedUrl(
      "getObject",
      {
        Bucket: S3_BUCKET_PRIVATE,
        Key: filePath,
        Expires: ONE_DAY_IN_SEC,
      },
      (err, requestUrl) => {
        if (err) {
          reject(err);
        }
        resolve(requestUrl);
      }
    );
  });
};

const s3Delete = (url) => {
  const S3 = new AWS.S3();

  const params = {
    Bucket: S3_BUCKET_PRIVATE,
    Delete: {
      // required
      Objects: [
        // required
        {
          Key: url, // required
        },
      ],
    },
  };
  S3.deleteObjects(
    params,
    (err, data) =>
      new Promise((resolve, reject) => {
        if (err) return reject(err);
        resolve({ success: "ok", data });
      })
  );
};

/**
 * Fetch the file from the s3 bucket.
 * @param {String} filePath
 * @returns
 */
const fetchFileFromS3 = async ({ filePath, bucket = S3_BUCKET_PRIVATE }) => {
  try {
    const requestUrl = fileUrlFromPath({ filePath, bucket });
    return await axios.get(requestUrl);
  } catch (error) {
    console.log("Unable to fetch the file from the s3 bucket", error);
    throw error;
  }
};

module.exports = {
  fileUrlFromPath,
  s3Uploader,
  s3UploadBlob,
  s3SignedGetUrl,
  fetchFileFromS3,
  s3Delete,
};
