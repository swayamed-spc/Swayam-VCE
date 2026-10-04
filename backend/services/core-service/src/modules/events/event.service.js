import {
    findAllEvents,
    findEventById,
    createEvent,
    updateEvent,
    updateEventStatus,
    deleteEvent
} from "./event.repository.js";

import {
    validateCreateEvent,
    validateUpdateEvent
} from "./event.validation.js";

import {
    validateStatusTransition
} from "./event.lifecycle.js";

function notFoundError() {
    const error =
        new Error(
            "Event not found"
        );

    error.statusCode = 404;

    return error;
}

function forbiddenError() {
    const error =
        new Error(
            "You do not have permission to modify this event"
        );

    error.statusCode = 403;

    return error;
}

function canModifyEvent(
    event,
    user
) {
    if (
        user.role === "ADMIN"
    ) {
        return true;
    }

    return (
        event.created_by ===
        user.id
    );
}

export async function getAllEvents(
    filters
) {
    return await findAllEvents(
        filters
    );
}

export async function getEventById(
    id
) {
    const event =
        await findEventById(id);

    if (!event) {
        throw notFoundError();
    }

    return event;
}

export async function createNewEvent(
    eventData,
    userId
) {
    validateCreateEvent(
        eventData
    );

    return await createEvent({
        title:
            eventData.title.trim(),

        slug:
            eventData.slug.trim(),

        description:
            eventData.description ||
            null,

        shortDescription:
            eventData.shortDescription ||
            null,

        venue:
            eventData.venue ||
            null,

        startTime:
            eventData.startTime,

        endTime:
            eventData.endTime,

        capacity:
            Number(
                eventData.capacity
            ),

        registrationDeadline:
            eventData.registrationDeadline ||
            null,

        status:
            "DRAFT",

        visibility:
            eventData.visibility ||
            "PUBLIC",

        bannerUrl:
            eventData.bannerUrl ||
            null,

        createdBy:
            userId
    });
}

export async function updateExistingEvent(
    id,
    eventData,
    user
) {
    const existingEvent =
        await findEventById(id);

    if (!existingEvent) {
        throw notFoundError();
    }

    if (
        !canModifyEvent(
            existingEvent,
            user
        )
    ) {
        throw forbiddenError();
    }

    validateUpdateEvent(
        eventData
    );

    const updatedData = {
        title:
            eventData.title ??
            existingEvent.title,

        slug:
            eventData.slug ??
            existingEvent.slug,

        description:
            eventData.description ??
            existingEvent.description,

        shortDescription:
            eventData.shortDescription ??
            existingEvent.short_description,

        venue:
            eventData.venue ??
            existingEvent.venue,

        startTime:
            eventData.startTime ??
            existingEvent.start_time,

        endTime:
            eventData.endTime ??
            existingEvent.end_time,

        capacity:
            eventData.capacity !== undefined
                ? Number(
                    eventData.capacity
                )
                : existingEvent.capacity,

        registrationDeadline:
            eventData.registrationDeadline ??
            existingEvent.registration_deadline,

        status:
            existingEvent.status,

        visibility:
            eventData.visibility ??
            existingEvent.visibility,

        bannerUrl:
            eventData.bannerUrl ??
            existingEvent.banner_url
    };

    validateCreateEvent(
        updatedData
    );

    return await updateEvent(
        id,
        updatedData
    );
}

export async function changeEventStatus(
    id,
    newStatus,
    user
) {
    const event =
        await findEventById(id);

    if (!event) {
        throw notFoundError();
    }

    if (
        !canModifyEvent(
            event,
            user
        )
    ) {
        throw forbiddenError();
    }

    validateStatusTransition(
        event.status,
        newStatus
    );

    return await updateEventStatus(
        id,
        newStatus
    );
}

export async function deleteExistingEvent(
    id,
    user
) {
    const event =
        await findEventById(id);

    if (!event) {
        throw notFoundError();
    }

    if (
        !canModifyEvent(
            event,
            user
        )
    ) {
        throw forbiddenError();
    }

    /*
     * Draft events can be physically deleted.
     */

    if (
        event.status === "DRAFT"
    ) {
        return await deleteEvent(
            id
        );
    }

    /*
     * Published/ongoing events
     * should not disappear from history.
     */

    if (
        event.status === "PUBLISHED" ||
        event.status === "ONGOING"
    ) {
        return await updateEventStatus(
            id,
            "CANCELLED"
        );
    }

    const error =
        new Error(
            `Cannot delete an event with status ${event.status}`
        );

    error.statusCode = 400;

    throw error;
}