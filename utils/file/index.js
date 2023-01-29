const extension = (filename) => filename.slice(-3);

const isFile = (file) => {
  return (
    file.indexOf(".") !== 0 && file !== "index.js" && extension(file) === ".js"
  );
};

const filenameWithoutExtension = (filename) => filename.slice(0, -3);

module.exports = { extension, isFile, filenameWithoutExtension };
