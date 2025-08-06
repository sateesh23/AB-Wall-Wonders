# Files Deleted for Sanity.io Migration

## Backend & API Files Removed:
- server/ (entire directory - Express backend)
- api/ (entire directory - Netlify functions)
- content/ (entire directory - Static content files)
- public/admin/ (entire directory - Netlify CMS admin)
- netlify.toml (Netlify configuration)

## Dependencies that will be removed:
- @notionhq/client
- netlify-cms-app
- express
- cors
- nodemailer
- @types/express
- @types/cors
- gray-matter
- marked

## Files that will be cleaned:
- client/lib/notion-*.ts
- client/lib/netlify-cms-service.ts
- client/api/submit-form.ts
- Various references in components

## Replacing with:
- Sanity.io CMS
- Sanity client for React
