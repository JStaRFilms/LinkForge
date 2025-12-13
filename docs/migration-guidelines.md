# Database Migration Guidelines

## Overview

This project uses **Prisma** with **SQLite** (swappable to Postgres).

## Best Practices

### 1. Think Before Migrate

> [!IMPORTANT]
> Never run `prisma migrate dev` without reviewing schema changes first!

Before migrating:
- Review the schema diff: `npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-database prisma/dev.db`
- Consider data migration needs for existing rows

### 2. Schema Design Rules

| Rule | ✅ Do | ❌ Don't |
|------|-------|---------|
| **Required FK** | Add with default/backfill | Add without handling existing rows |
| **Unique on optional** | `String @unique` (required) | `String? @unique` (allows one NULL) |
| **New required column** | Add with `@default()` | Add without default on populated table |

### 3. Migration Naming

Use descriptive names:
```bash
# Good
npx prisma migrate dev --name add_user_email_field
npx prisma migrate dev --name remove_legacy_avatar_url

# Bad
npx prisma migrate dev --name update
npx prisma migrate dev --name fix
```

### 4. Handling Breaking Changes

For changes that affect existing data:

1. **Add nullable first** → Deploy → Backfill → Make required
2. **Or** reset database (dev only): 
   ```bash
   npx prisma migrate reset --force
   ```

### 5. Squashing Migrations (Dev Only)

If you have too many dev migrations:

```bash
# Delete all migrations and DB
Remove-Item -Recurse -Force prisma\migrations\*
Remove-Item -Force prisma\dev.db

# Create fresh baseline
npx prisma migrate dev --name init
```

> [!CAUTION]
> Never squash in production! Use Prisma's migration history.

### 6. Down Migrations

Prisma doesn't auto-generate down migrations. For critical tables, manually add rollback SQL:

```sql
-- In a separate file: migration_name.down.sql
DROP TABLE IF EXISTS "NewTable";
ALTER TABLE "OldTable" DROP COLUMN "newColumn";
```

## Current Schema Summary

| Model | Required Fields | Indexes |
|-------|----------------|---------|
| User | id, createdAt, updatedAt | id (PK) |
| Profile | id, username, userId, theme | username (unique), userId (index) |
| Link | id, title, url, profileId | profileId (FK) |

## Commands

```bash
# Dev migration
npx prisma migrate dev --name <name>

# Reset (destroys data)
npx prisma migrate reset --force

# Generate client only
npx prisma generate

# Seed
npx prisma db seed
```
