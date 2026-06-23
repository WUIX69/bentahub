# Environment Variables Reference

This document lists all environment variables configured for the BentaHub project.

<!-- AUTO-GENERATED START -->
| Variable | Required | Description | Example / Default |
|---|---|---|---|
| `DATABASE_URL` | Yes | Connection string for PostgreSQL database | `postgresql://postgres:password@localhost:5432/bentahub` |
| `JWT_SECRET` | Yes | Secret key used for signing and verifying JSON Web Tokens | `your-secret-key-change-in-production` |
| `EMAIL_SERVICE` | No | Optional SMTP service provider (e.g. Gmail). Left empty for default local fallback |  |
| `EMAIL_USER` | No | SMTP username/email address for authentication |  |
| `EMAIL_PASSWORD` | No | SMTP password/App Password for authentication |  |
| `EMAIL_FROM` | No | Originating email address for notification emails | `noreply@bentahub.local` |
| `EMAIL_HOST` | No | SMTP host address for sending emails (e.g. Mailpit) | `localhost` |
| `EMAIL_PORT` | No | SMTP port for sending emails | `1025` |
| `NODE_ENV` | Yes | Environment setting (development, production, or test) | `development` |
| `NEXT_PUBLIC_APP_URL` | Yes | Public URL of the application frontend | `http://localhost:3000` |

<!-- AUTO-GENERATED END -->
