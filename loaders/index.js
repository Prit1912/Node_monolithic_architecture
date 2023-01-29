const expressLoaders = require("./express.loaders");
const mongoDatabaseLoader = require("./mongoose.loaders");
require("./models.loaders");

module.exports = async ({ app }) => {
  expressLoaders({ app });
  await mongoDatabaseLoader();
};
