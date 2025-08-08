import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next)=> {
    try {
        const {success}= await ratelimit.limit("my-limit-key")
        // for my-limit-key, you can use req.ip or req.user.id to limit by user or IP address i.e you can use an ip address or user identifier to limit requests so in place of "my-limit-key" you can use `req.ip` or `req.user.id` if you have user authentication set up
      
        if(!success){
            return res.status(429).json({
                message:"Too many requests, please try again later"
            })
        }
        next(); // Call the next middleware function in the stack
    } catch (error) {
        console.log("Rate limit error", error);
        next(error); // Pass the error to the next middleware
    }
}

export default rateLimiter;
// This middleware checks the rate limit for incoming requests and allows or denies them based on the defined  