CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    firebase_uid VARCHAR(128) UNIQUE NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    name VARCHAR(100),

    profile_picture TEXT,

    role VARCHAR(30) NOT NULL DEFAULT 'STUDENT',

    created_at TIMESTAMP WITH TIME ZONE
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP WITH TIME ZONE
        DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_firebase_uid
ON users(firebase_uid);

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);



