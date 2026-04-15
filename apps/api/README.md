# Structure

`/middleware` - Transport concerns that run in request pipeline (HTTP behaviorscors, auth guards, logging, rate limit, etc).

`/lib` - Domain and application primitives, reusable app core functionality.

`/handlers` - Controllers, HTTP layer, delegates to services, shape and parse req/response and general transport orchestration. Validate request shape/params.

`/services` - Business and domain logic, persistence layer (db operations).