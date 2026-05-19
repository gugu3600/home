import "dotenv/config"


export const corsConfig = {
    origin : process.env.APP_URL,
    methods : ["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders : ["Authorization","Content-Type","Cookie"],
    exposedHeaders : ["Set-Cookie"],
    credentials : true
}