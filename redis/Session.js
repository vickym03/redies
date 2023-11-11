const redisConnection = require("./config");

const setData = async (key, data) => {
  redisConnection.set(key, JSON.stringify(data), "EX", 3600);
};

// function getData(id) {
//   return redisConnection.get(id).then((data) => {
//     if (data === null) {
//       throw new Error("Data not found");
//     }
//     return JSON.parse(data);
//   });
// }

const getData = async (key) => {
  return redisConnection.get(key);
};
module.exports = { setData, getData };
