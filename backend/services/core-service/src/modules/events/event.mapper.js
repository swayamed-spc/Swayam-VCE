export function mapEvent(
    event
) {
    if (!event) {
        return null;
    }

    return {
        id: event.id,

        title: event.title,

        slug: event.slug,

        description:
            event.description,

        shortDescription:
            event.short_description,

        venue:
            event.venue,

        startTime:
            event.start_time,

        endTime:
            event.end_time,

        capacity:
            event.capacity,

        registrationDeadline:
            event.registration_deadline,

        status:
            event.status,

        visibility:
            event.visibility,

        bannerUrl:
            event.banner_url,

        createdBy:
            event.created_by,

        createdAt:
            event.created_at,

        updatedAt:
            event.updated_at
    };
}

export function mapEvents(
    events
) {
    return events.map(
        mapEvent
    );
}