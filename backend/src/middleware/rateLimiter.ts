import ratelimit from "../config/upstash.ts";

//Middleware to limit request rate
const rateLimiter = async(req, res, next) => {
    try {
        //Check if request can proceed under the rate limit
        const {success} = await ratelimit.limit("my-limit-key");
        //If the limit has been exceeded, respond with 429 error
        if(!success){
            return res.status(429).json({
                message:"Too many requests, please try again later",
            });
        }

        //Continue to next middleware/route
        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
};

export default rateLimiter;
