import "dotenv/config";


export const cookieConfig =
{
    httpOnly: process.env.COOKIE_HTTP_ONLY,
    secure: process.env.COOKIE_SECURE,
    sameSite: process.env.COOKIE_SAMESITE,
    maxAge: process.env.COOKIE_MAX_AGE
}