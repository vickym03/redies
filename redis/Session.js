const redisConnection = require("./config");

const setData = async (key, data) => {
  redisConnection.set(key, JSON.stringify(data), { EX: 60 });
};

const getData = async (key) => {
  const data = await redisConnection.get(key);
  return JSON.parse(data);
};

module.exports = { setData, getData };
