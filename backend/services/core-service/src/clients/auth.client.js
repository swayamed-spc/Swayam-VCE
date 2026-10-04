import {
    env
} from "../config/env.js";

export async function getCurrentUser(
    authorizationHeader
) {
    if (!authorizationHeader) {
        const error =
            new Error(
                "Authorization header is required"
            );

        error.statusCode = 401;

        throw error;
    }

    const response =
        await fetch(
            `${env.authService.url}/auth/me`,
            {
                method: "GET",

                headers: {
                    Authorization:
                        authorizationHeader
                }
            }
        );

    let data;

    try {
        data =
            await response.json();
    } catch {
        data = {};
    }

    if (!response.ok) {
        const error =
            new Error(
                data.message ||
                "Authentication failed"
            );

        error.statusCode =
            response.status;

        throw error;
    }

    return data.data.user;
}