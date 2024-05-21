const { createClient } = require("redis");
const hash = require("object-hash");
const logger = require("../start/logger");

let redisClient = null;

async function connectToRedis() {
  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    redisClient = createClient({
      url: redisUrl,
    });
    redisClient.on("error", (error) => {
      console.log("Redis error: ", error);
    });

    try {
      await redisClient.connect();
      console.log("Connected to Redis");
    } catch (error) {
      console.error("Error connecting to Redis: ", error);
    }
  }
}

function isRedisWorking() {
  // Check if the redis client is connected
  return redisClient?.isOpen;
}

async function readData(key) {
  let cachedValue = undefined;
  if (isRedisWorking()) {
    cachedValue = await redisClient.get(key);

    if (cachedValue) {
      return cachedValue;
    }
  }
}

async function writeData(key, data, options) {
  if (isRedisWorking()) {
    try {
      await redisClient.set(key, data, options);
    } catch (e) {
      logger.error("Error writing to Redis: ", e);
    }
  }
}

function requestKey(req) {
  const reqDataToHash = {
    query: req.query,
    body: req.body,
  };

  return `${req.path}@${hash(reqDataToHash)}`;
}

function redisCacheMiddleware(
  options = {
    EX: 300, // 5 minutes
  },
  compresssion = false
) {
  return async (req, res, next) => {
    if (isRedisWorking()) {
      // first request the key
      const key = requestKey(req);
      // if there are some cach evalue lets retrieve it
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        // cached data is avaialable, send the cached data
        try {
          // try to parse the cached data in JSON and send it
          return res.json(JSON.parse(cachedData));
        } catch (e) {
          // otherwise send the raw cached data as it is
          return res.send(cachedData);
        }
      } else {
        // cache data is not avaialable
        // cache the response data
        const oldSend = res.send;
        res.send = function (data) {
          res.send = oldSend;

          if (res.statusCode.toString().startsWith("2")) {
            writeData(key, data, options).then();
          }

          return res.send(data);
        };

        // continue to the next middleware
        next();
      }
    } else {
      next();
    }
  };
}

module.exports = {
  connectToRedis,
  redisCacheMiddleware,
};
