import { pool } from "../config/db.js";


export async function findByFirebaseUid(firebaseUid) {

    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE firebase_uid = $1
        `,
        [firebaseUid]
    );

    return result.rows[0] || null;
}


export async function findById(id) {

    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0] || null;
}


export async function createUser({
    firebaseUid,
    email,
    name,
    profilePicture
}) {

    const result = await pool.query(
        `
        INSERT INTO users (
            firebase_uid,
            email,
            name,
            profile_picture
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            firebaseUid,
            email,
            name,
            profilePicture
        ]
    );

    return result.rows[0];
}


export async function updateUser(
    firebaseUid,
    {
        email,
        name,
        profilePicture
    }
) {

    const result = await pool.query(
        `
        UPDATE users
        SET
            email = $1,
            name = $2,
            profile_picture = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE firebase_uid = $4
        RETURNING *
        `,
        [
            email,
            name,
            profilePicture,
            firebaseUid
        ]
    );

    return result.rows[0];
}