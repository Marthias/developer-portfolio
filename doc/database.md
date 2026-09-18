# Developer Portfolio — Database Design

## Database Technology

PostgreSQL

The database will be hosted using Supabase.

## Entities

### Users

Stores application-level information about authenticated administrators.

### Projects

Stores portfolio projects.

### Project Media

Stores media associated with portfolio projects.

### Technologies

Stores reusable technologies and frameworks.

### Project Technologies

Junction table implementing the many-to-many relationship between
projects and technologies.

### Skills

Stores technical skills.

### Experience

Stores professional and relevant technical experience.

### Education

Stores academic qualifications.

### Certifications

Stores professional certifications.

### Blog Posts

Stores technical articles published on the portfolio.

### Messages

Stores messages submitted through the contact form.

## Relationships

- One project can have many media items.
- One project can use many technologies.
- One technology can belong to many projects.
- One administrator can manage multiple portfolio entities.
- Blog posts are managed by authenticated administrators.

## Project/Technology Relationship

Projects and technologies have a many-to-many relationship.

This relationship is implemented using the `project_technologies`
junction table.

## Design Principles

- Use normalized relational data.
- Avoid unnecessary duplication.
- Use primary keys for entity identification.
- Use foreign keys for relationships.
- Use appropriate constraints.
- Use timestamps for auditable records.
- Use indexes where query performance requires them.
- Protect administrative data using authentication and authorization.
- Use Row Level Security where appropriate.