const transitions = {
    DRAFT: [
        "PUBLISHED",
        "CANCELLED"
    ],

    PUBLISHED: [
        "ONGOING",
        "CANCELLED"
    ],

    ONGOING: [
        "COMPLETED",
        "CANCELLED"
    ],

    COMPLETED: [],

    CANCELLED: []
};

export function validateStatusTransition(
    currentStatus,
    newStatus
) {
    if (
        currentStatus === newStatus
    ) {
        const error =
            new Error(
                `Event is already ${currentStatus}`
            );

        error.statusCode = 400;

        throw error;
    }

    const allowed =
        transitions[
            currentStatus
        ] || [];

    if (
        !allowed.includes(
            newStatus
        )
    ) {
        const error =
            new Error(
                `Cannot change event status from ${currentStatus} to ${newStatus}`
            );

        error.statusCode = 400;

        throw error;
    }
}