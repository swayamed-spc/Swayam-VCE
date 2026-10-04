import { syncUser,getCurrentUser } from "../services/auth.service.js";

export async function syncUserController(
    req,
    res,
    next
) {
    try {
        const user =
            await syncUser(
                req.firebaseUser
            );

        res.status(200).json({
            success: true,
            data: {
                user
            }
        });

    } catch (error) {
        next(error);
    }
}

export async function meController(
    req,
    res,
    next
) {

    try {

        const user =
            await getCurrentUser(
                req.firebaseUser.uid
            );


        res.status(200).json({
            success: true,
            data: {
                user
            }
        });

    } catch (error) {

        next(error);
    }
}