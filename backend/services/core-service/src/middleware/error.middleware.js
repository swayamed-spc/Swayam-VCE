export function errorMiddleware(
    error,
    req,
    res,
    next
) {
    console.error(
        error
    );

    let statusCode =
        error.statusCode || 500;

    let message =
        error.message ||
        "Internal server error";

    // PostgreSQL unique violation
    if (
        error.code === "23505"
    ) {
        statusCode = 409;

        message =
            "An event with this unique value already exists";
    }

    // PostgreSQL check violation
    if (
        error.code === "23514"
    ) {
        statusCode = 400;

        message =
            "Event data violates a database constraint";
    }

    res.status(statusCode).json({
        success: false,
        message
    });
}