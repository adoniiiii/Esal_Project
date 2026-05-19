# Security Plan

## Environment Variables

Sensitive data such as API keys, database passwords and JWT secrets must be stored in `.env`.

The `.env` file must not be committed to GitHub.

Only `.env.example` is allowed in the repository.

## Authentication

The website should use authentication for users, service providers and admins.

Recommended approach:

- JWT-based authentication
- Protected admin routes
- Role-based access control

## User Roles

Planned roles:

- Tourist
- Service Provider
- Admin

## Password Security

Passwords must not be stored as plain text.

Recommended hashing algorithm:

- bcrypt

## Input Validation

All user input must be validated on the backend side.

Examples:

- Booking form data
- Login data
- Package creation data
- AI assistant prompt

## API Security

Planned API security measures:

- CORS configuration
- Rate limiting
- Input validation
- Password hashing
- JWT authentication
- Role-based access control

## Docker Security

The project should run through Docker Compose.

No secrets should be hardcoded inside:

- Dockerfile
- docker-compose.yml
- source code

## GitHub Security

The repository should not contain:

- `.env`
- API keys
- passwords
- database dumps
- private tokens