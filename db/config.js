const mongoose = require("mongoose");

const URL = "url";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbConnection = () => {
  mongoose
    .connect(URL, connectionParams)
    .then(() => {
      console.log("Connected to DB successfully !");
    })
    .catch((error) => {
      console.log("Failed to connect DB", error);
    });
};

module.exports = dbConnection;
