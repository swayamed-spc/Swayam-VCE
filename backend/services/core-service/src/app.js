import express from "express";
import cors from "cors";
import helmet from "helmet";

import eventRoutes
    from "./modules/events/event.routes.js";

import certificateRoutes
    from "./modules/certificates/certificate.routes.js";

import analyticsRoutes
    from "./modules/analytics/analytics.routes.js";

import {
    errorMiddleware
} from "./middleware/error.middleware.js";

const app =
    express();

app.use(
    cors()
);

app.use(
    helmet()
);

app.use(
    express.json()
);

app.get(
    "/health",
    (req, res) => {
        res.status(200).json({
            success: true,
            service:
                "core-service",
            status:
                "healthy"
        });
    }
);

app.use(
    "/events",
    eventRoutes
);

app.use(
    "/certificates",
    certificateRoutes
);

app.use(
    "/analytics",
    analyticsRoutes
);

app.use(
    errorMiddleware
);

export default app;