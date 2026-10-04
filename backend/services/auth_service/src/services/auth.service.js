import { findByFirebaseUid,createUser,updateUser} from "../repositories/user.respository.js";

export async function syncUser(FirebaseUser){
    const {
        uid,
        email,
        name,
        picture
    } = FirebaseUser;

    let user= await findByFirebaseUid(uid);
    if(!user){
        user = await createUser({
            firebaseUid:uid,
            email:email,
            name:name,
            profilePicture:picture
        })

        return user;
    }
    
    user = await updateUser(
        uid,
        {
            email,
            name: name|| null,
            profilePicture: picture|| null 
        }
    )
    
    return user;
}
export async function getCurrentUser(firebaseUid) {

    const user =
        await findByFirebaseUid(firebaseUid);


    if (!user) {

        const error =
            new Error("Swayam user not found");

        error.statusCode = 404;

        throw error;
    }


    return user;
}