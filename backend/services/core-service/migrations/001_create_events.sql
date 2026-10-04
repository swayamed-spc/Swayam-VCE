CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL UNIQUE,

    description TEXT,

    short_description VARCHAR(500),

    venue VARCHAR(255),

    start_time TIMESTAMPTZ NOT NULL,

    end_time TIMESTAMPTZ NOT NULL,

    capacity INTEGER NOT NULL CHECK (capacity > 0),

    registration_deadline TIMESTAMPTZ,

    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT'
        CHECK (
            status IN (
                'DRAFT',
                'PUBLISHED',
                'ONGOING',
                'COMPLETED',
                'CANCELLED'
            )
        ),

    banner_url TEXT,

    created_by UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_event_time
        CHECK (end_time > start_time),

    CONSTRAINT valid_registration_deadline
        CHECK (
            registration_deadline IS NULL
            OR registration_deadline <= start_time
        )
);

CREATE INDEX IF NOT EXISTS idx_events_start_time
    ON events(start_time);

CREATE INDEX IF NOT EXISTS idx_events_status
    ON events(status);

CREATE INDEX IF NOT EXISTS idx_events_created_by
    ON events(created_by);