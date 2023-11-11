const redis = require("redis");

// Create a Redis client
const redisConnection = redis.createClient({
  // Configuration options if needed (e.g., host, port)
});

// Error handling
redisConnection.on("error", (error) => {
  console.error(`Error: ${error}`);
});

// Connect to the Redis server
(async () => {
  await redisConnection.connect();
})();

// Disconnect from the Redis server
async function closeRedisConnection() {
  await redisConnection.quit();
  console.log("Redis client has been closed.");
}

// Export the Redis client
module.exports = redisConnection;
