import express from "express";

import {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    updateEventStatus,
    deleteEvent
} from "./event.controller.js";

import {
    authenticate
} from "../../middleware/auth.middleware.js";

import {
    requireRole
} from "../../middleware/role.middleware.js";

const router =
    express.Router();

const organizerOrAdmin =
    [
        authenticate,
        requireRole(
            "ORGANIZER",
            "ADMIN"
        )
    ];

/*
 * Public routes
 */

router.get(
    "/",
    getEvents
);

router.get(
    "/:id",
    getEvent
);


/*
 * Organizer/Admin routes
 */

router.post(
    "/",
    ...organizerOrAdmin,
    createEvent
);

router.patch(
    "/:id",
    ...organizerOrAdmin,
    updateEvent
);

router.patch(
    "/:id/status",
    ...organizerOrAdmin,
    updateEventStatus
);

router.delete(
    "/:id",
    ...organizerOrAdmin,
    deleteEvent
);

export default router;