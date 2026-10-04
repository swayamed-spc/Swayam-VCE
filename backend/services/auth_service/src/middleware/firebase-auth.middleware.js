import { firebaseAuth } from "../config/firebase.js";

export async function authenticateFirebase(req,res,next){
    try{
        const authorization=req.headers.authorization;
        if(!authorization){
            return res.status(401).json({
                sucess:false,
                message:"Authentication Failed"
            });
        }
        const [scheme,token]=authorization.split(" ");
        if(scheme !=="Bearer" || !token){
            return res.status(401).json({
                sucess:false,
                message:"Invalid authorization header"
            });
        }
        const decodedToken = await firebaseAuth.verifyIdToken(token);
        req.firebaseUser=decodedToken;
        next();
    }
    catch(error){
        console.error(
            "Firebase token verification failed",
            error.message
        );
        return res.status(401).json({
            sucess:false,
            message:"Invalid or expired Firebase Token"
        });
    }
}