const VALID_STATUSES = [
    "DRAFT",
    "PUBLISHED",
    "ONGOING",
    "COMPLETED",
    "CANCELLED"
];

const VALID_VISIBILITIES = [
    "PUBLIC",
    "PRIVATE"
];

export function validateCreateEvent(
    data
) {
    const errors = [];

    if (
        !data.title ||
        typeof data.title !== "string" ||
        data.title.trim() === ""
    ) {
        errors.push(
            "title is required"
        );
    }

    if (
        !data.slug ||
        typeof data.slug !== "string" ||
        data.slug.trim() === ""
    ) {
        errors.push(
            "slug is required"
        );
    }

    if (!data.startTime) {
        errors.push(
            "startTime is required"
        );
    }

    if (!data.endTime) {
        errors.push(
            "endTime is required"
        );
    }

    if (
        data.capacity === undefined ||
        data.capacity === null ||
        Number.isNaN(
            Number(data.capacity)
        ) ||
        Number(data.capacity) <= 0
    ) {
        errors.push(
            "capacity must be greater than zero"
        );
    }

    if (
        data.status &&
        !VALID_STATUSES.includes(
            data.status
        )
    ) {
        errors.push(
            `status must be one of: ${VALID_STATUSES.join(", ")}`
        );
    }

    if (
        data.visibility &&
        !VALID_VISIBILITIES.includes(
            data.visibility
        )
    ) {
        errors.push(
            `visibility must be one of: ${VALID_VISIBILITIES.join(", ")}`
        );
    }

    if (errors.length > 0) {
        const error =
            new Error(
                errors.join(", ")
            );

        error.statusCode = 400;

        throw error;
    }

    validateEventTimes(data);
}

export function validateUpdateEvent(
    data
) {
    const errors = [];

    if (
        data.title !== undefined &&
        (
            typeof data.title !== "string" ||
            data.title.trim() === ""
        )
    ) {
        errors.push(
            "title must be a non-empty string"
        );
    }

    if (
        data.slug !== undefined &&
        (
            typeof data.slug !== "string" ||
            data.slug.trim() === ""
        )
    ) {
        errors.push(
            "slug must be a non-empty string"
        );
    }

    if (
        data.capacity !== undefined &&
        (
            Number.isNaN(
                Number(data.capacity)
            ) ||
            Number(data.capacity) <= 0
        )
    ) {
        errors.push(
            "capacity must be greater than zero"
        );
    }

    if (
        data.status !== undefined &&
        !VALID_STATUSES.includes(
            data.status
        )
    ) {
        errors.push(
            `status must be one of: ${VALID_STATUSES.join(", ")}`
        );
    }

    if (
        data.visibility !== undefined &&
        !VALID_VISIBILITIES.includes(
            data.visibility
        )
    ) {
        errors.push(
            `visibility must be one of: ${VALID_VISIBILITIES.join(", ")}`
        );
    }

    if (errors.length > 0) {
        const error =
            new Error(
                errors.join(", ")
            );

        error.statusCode = 400;

        throw error;
    }
}

export function validateEventTimes(
    data
) {
    const startTime =
        new Date(data.startTime);

    const endTime =
        new Date(data.endTime);

    if (
        Number.isNaN(
            startTime.getTime()
        ) ||
        Number.isNaN(
            endTime.getTime()
        )
    ) {
        const error =
            new Error(
                "Invalid event date"
            );

        error.statusCode = 400;

        throw error;
    }

    if (
        endTime <= startTime
    ) {
        const error =
            new Error(
                "endTime must be after startTime"
            );

        error.statusCode = 400;

        throw error;
    }

    if (
        data.registrationDeadline
    ) {
        const deadline =
            new Date(
                data.registrationDeadline
            );

        if (
            Number.isNaN(
                deadline.getTime()
            )
        ) {
            const error =
                new Error(
                    "Invalid registrationDeadline"
                );

            error.statusCode = 400;

            throw error;
        }

        if (
            deadline > startTime
        ) {
            const error =
                new Error(
                    "registrationDeadline must be before startTime"
                );

            error.statusCode = 400;

            throw error;
        }
    }
}