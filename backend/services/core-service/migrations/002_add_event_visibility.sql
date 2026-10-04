ALTER TABLE events
ADD COLUMN IF NOT EXISTS visibility VARCHAR(20)
DEFAULT 'PUBLIC';

ALTER TABLE events
DROP CONSTRAINT IF EXISTS valid_event_visibility;

ALTER TABLE events
ADD CONSTRAINT valid_event_visibility
CHECK (
    visibility IN (
        'PUBLIC',
        'PRIVATE'
    )
);

CREATE INDEX IF NOT EXISTS
idx_events_visibility
ON events(visibility);