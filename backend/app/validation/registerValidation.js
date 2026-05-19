import { prisma } from "../../config/prisma";

export async function registerValidate(req,res,next)
 {
 
    const {name,email,password} = req.body;
    const errors = [];

    if(!name) errors.push("Name required");
    if(!email) errors.push("Email required");
    if(!password) errors.push("Password required");

    if(errors.length > 0) {
        return res.status(400).json({errors});
    }

    try {

        const user = await prisma.user.findUnique({
            where : { email }
        });

        if(user) {
            return res.status(422).json({message : "Email has already taken"});
        }
        const data = {name,email,password};
        res.locals.user = data;
        return next();
    }

    catch (error){
        return res.status(500).json({message : "Internal server error"});
    }
}