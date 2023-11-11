// const redisConnection = require("../redis/config");

// const isCached = (req, res, next) => {
//   const { id } = req.body;
//   // Assuming you use a route parameter for 'id'
//   console.log(id);
//   redisConnection.get(id, (err, data) => {
//     console.log(data)
//     if (err) {
//       console.error(err);
//       next(); // Proceed to the route handler even if there's an error with Redis
//     } else if (data) {
//       console.log("Data found in Redis");
//       const cachedData = JSON.parse(data);
//       console.log(cachedData);
//       res.json(cachedData); // Return cached data and skip the route handler
//     } else {
//       // Data not found in Redis, continue to the route handler
//       next();
//     }
//   });
// };

// module.exports = isCached;



const redisConnection = require('../redis/config');

const isCached = (req, res, next) => {
  const { id } = req.params;
  console.log("cavched",id)
  redisConnection.get(id, (err, data) => {
    if (err) {
      console.error(err);
      next();
    } else if (data) {
      console.log('Data found in Redis');
      const cachedData = JSON.parse(data);
      res.json(cachedData);
    } else {
      next();
    }
  });
};

module.exports = isCached;
