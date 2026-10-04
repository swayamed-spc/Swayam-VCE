import {
    getAllEvents,
    getEventById,
    createNewEvent,
    updateExistingEvent,
    changeEventStatus,
    deleteExistingEvent
} from "./event.service.js";

import {
    mapEvent,
    mapEvents
} from "./event.mapper.js";

function parsePositiveInteger(
    value,
    fallback
) {
    const parsed =
        Number(value);

    if (
        !Number.isInteger(parsed) ||
        parsed <= 0
    ) {
        return fallback;
    }

    return parsed;
}

export async function getEvents(
    req,
    res,
    next
) {
    try {
        const page =
            parsePositiveInteger(
                req.query.page,
                1
            );

        const limit =
            Math.min(
                parsePositiveInteger(
                    req.query.limit,
                    20
                ),
                100
            );

        const result =
            await getAllEvents({
                search:
                    req.query.search,

                status:
                    req.query.status,

                visibility:
                    req.query.visibility,

                from:
                    req.query.from,

                to:
                    req.query.to,

                page,

                limit
            });

        res.status(200).json({
            success: true,

            data:
                mapEvents(
                    result.events
                ),

            pagination: {
                page,
                limit,
                total:
                    result.total,

                totalPages:
                    Math.ceil(
                        result.total /
                        limit
                    )
            }
        });

    } catch (error) {
        next(error);
    }
}

export async function getEvent(
    req,
    res,
    next
) {
    try {
        const event =
            await getEventById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data:
                mapEvent(event)
        });

    } catch (error) {
        next(error);
    }
}

export async function createEvent(
    req,
    res,
    next
) {
    try {
        const event =
            await createNewEvent(
                req.body,
                req.user.id
            );

        res.status(201).json({
            success: true,
            data:
                mapEvent(event)
        });

    } catch (error) {
        next(error);
    }
}

export async function updateEvent(
    req,
    res,
    next
) {
    try {
        const event =
            await updateExistingEvent(
                req.params.id,
                req.body,
                req.user
            );

        res.status(200).json({
            success: true,
            data:
                mapEvent(event)
        });

    } catch (error) {
        next(error);
    }
}

export async function updateEventStatus(
    req,
    res,
    next
) {
    try {
        const event =
            await changeEventStatus(
                req.params.id,
                req.body.status,
                req.user
            );

        res.status(200).json({
            success: true,
            data:
                mapEvent(event)
        });

    } catch (error) {
        next(error);
    }
}

export async function deleteEvent(
    req,
    res,
    next
) {
    try {
        const event =
            await deleteExistingEvent(
                req.params.id,
                req.user
            );

        res.status(200).json({
            success: true,

            message:
                "Event deleted successfully",

            data:
                mapEvent(event)
        });

    } catch (error) {
        next(error);
    }
}