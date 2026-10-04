import {
    pool
} from "../../config/db.js";

const EVENT_COLUMNS = `
    id,
    title,
    slug,
    description,
    short_description,
    venue,
    start_time,
    end_time,
    capacity,
    registration_deadline,
    status,
    visibility,
    banner_url,
    created_by,
    created_at,
    updated_at
`;

export async function findAllEvents({
    search,
    status,
    visibility,
    from,
    to,
    page,
    limit
}) {
    const conditions = [];
    const values = [];

    let parameterIndex = 1;

    if (search) {
        conditions.push(`
            (
                title ILIKE $${parameterIndex}
                OR short_description ILIKE $${parameterIndex}
                OR venue ILIKE $${parameterIndex}
            )
        `);

        values.push(
            `%${search}%`
        );

        parameterIndex++;
    }

    if (status) {
        conditions.push(
            `status = $${parameterIndex}`
        );

        values.push(status);

        parameterIndex++;
    }

    if (visibility) {
        conditions.push(
            `visibility = $${parameterIndex}`
        );

        values.push(visibility);

        parameterIndex++;
    }

    if (from) {
        conditions.push(
            `start_time >= $${parameterIndex}`
        );

        values.push(from);

        parameterIndex++;
    }

    if (to) {
        conditions.push(
            `start_time <= $${parameterIndex}`
        );

        values.push(to);

        parameterIndex++;
    }

    const whereClause =
        conditions.length > 0
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

    const countResult =
        await pool.query(
            `
            SELECT COUNT(*)::integer AS total
            FROM events
            ${whereClause}
            `,
            values
        );

    const total =
        countResult.rows[0].total;

    const offset =
        (page - 1) * limit;

    values.push(limit);
    values.push(offset);

    const result =
        await pool.query(
            `
            SELECT ${EVENT_COLUMNS}
            FROM events
            ${whereClause}
            ORDER BY start_time ASC
            LIMIT $${parameterIndex}
            OFFSET $${parameterIndex + 1}
            `,
            values
        );

    return {
        events: result.rows,
        total
    };
}

export async function findEventById(
    id
) {
    const result =
        await pool.query(
            `
            SELECT ${EVENT_COLUMNS}
            FROM events
            WHERE id = $1
            `,
            [id]
        );

    return (
        result.rows[0] ||
        null
    );
}

export async function createEvent(
    eventData
) {
    const result =
        await pool.query(
            `
            INSERT INTO events (
                title,
                slug,
                description,
                short_description,
                venue,
                start_time,
                end_time,
                capacity,
                registration_deadline,
                status,
                visibility,
                banner_url,
                created_by
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11,
                $12,
                $13
            )
            RETURNING ${EVENT_COLUMNS}
            `,
            [
                eventData.title,
                eventData.slug,
                eventData.description,
                eventData.shortDescription,
                eventData.venue,
                eventData.startTime,
                eventData.endTime,
                eventData.capacity,
                eventData.registrationDeadline,
                eventData.status,
                eventData.visibility,
                eventData.bannerUrl,
                eventData.createdBy
            ]
        );

    return result.rows[0];
}

export async function updateEvent(
    id,
    eventData
) {
    const result =
        await pool.query(
            `
            UPDATE events
            SET
                title = $1,
                slug = $2,
                description = $3,
                short_description = $4,
                venue = $5,
                start_time = $6,
                end_time = $7,
                capacity = $8,
                registration_deadline = $9,
                status = $10,
                visibility = $11,
                banner_url = $12,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $13
            RETURNING ${EVENT_COLUMNS}
            `,
            [
                eventData.title,
                eventData.slug,
                eventData.description,
                eventData.shortDescription,
                eventData.venue,
                eventData.startTime,
                eventData.endTime,
                eventData.capacity,
                eventData.registrationDeadline,
                eventData.status,
                eventData.visibility,
                eventData.bannerUrl,
                id
            ]
        );

    return (
        result.rows[0] ||
        null
    );
}

export async function updateEventStatus(
    id,
    status
) {
    const result =
        await pool.query(
            `
            UPDATE events
            SET
                status = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING ${EVENT_COLUMNS}
            `,
            [
                status,
                id
            ]
        );

    return (
        result.rows[0] ||
        null
    );
}

export async function deleteEvent(
    id
) {
    const result =
        await pool.query(
            `
            DELETE FROM events
            WHERE id = $1
            RETURNING ${EVENT_COLUMNS}
            `,
            [id]
        );

    return (
        result.rows[0] ||
        null
    );
}