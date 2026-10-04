import "dotenv/config";

import app from "./src/app.js";

import { pool } from "./src/config/db.js";

import { env } from "./src/config/env.js";


async function startServer() {

    try {

        await pool.query("SELECT 1");

        console.log(
            "PostgreSQL connected successfully"
        );


        app.listen(
            env.port,
            () => {

                console.log(
                    `Auth Service running on port ${env.port}`
                );

            }
        );

    } catch (error) {

        console.error(
            "Failed to start Auth Service:",
            error
        );

        process.exit(1);
    }
}


startServer();