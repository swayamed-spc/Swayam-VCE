import {
    getCurrentUser
} from "../clients/auth.client.js";

export async function authenticate(
    req,
    res,
    next
) {
    try {
        const authorization =
            req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                success: false,
                message:
                    "Authorization header required"
            });
        }

        if (
            !authorization.startsWith(
                "Bearer "
            )
        ) {
            return res.status(401).json({
                success: false,
                message:
                    "Authorization header must use Bearer token"
            });
        }

        const user =
            await getCurrentUser(
                authorization
            );

        req.user = user;

        next();

    } catch (error) {
        next(error);
    }
}