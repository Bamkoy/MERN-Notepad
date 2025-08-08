 import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

// create a ratelimiter that allows 5 requests per 10 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"), // 2 requests every 10 seconds

});

export default ratelimit;
// This code sets up a rate limiter using Upstash Redis, allowing 5 requests every