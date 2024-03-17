const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  return mongoose.connect(url, connectionParams);
}

module.exports = {
  connectToMongoDB,
};
