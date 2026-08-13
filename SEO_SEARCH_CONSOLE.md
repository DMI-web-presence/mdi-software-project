# SEO and Google Search Console Setup

This document records the SEO/indexing work done for `mdisoftware.dev` and the follow-up steps in Google Search Console.

## Goal

Make the MDI Software website easier for Google to discover, crawl, understand, and index when searching for terms like:

- `MDI Software`
- `mdisoftware.dev`
- `website de prezentare`
- `magazin online`
- `aplicatii web custom`

## Code Changes Implemented

### Shared SEO Config

Added a shared SEO helper in:

- `lib/seo.ts`

It centralizes:

- Site name: `MDI Software`
- Site description
- SEO keywords
- Production URL detection
- Absolute URL generation

The site URL is resolved from:

1. `NEXT_PUBLIC_SITE_URL`
2. `SITE_URL`
3. `VERCEL_PROJECT_PRODUCTION_URL`
4. `VERCEL_URL`
5. Local fallback: `http://localhost:3000`

For production, the intended value is:

```env
NEXT_PUBLIC_SITE_URL=https://mdisoftware.dev
```

### Metadata

Updated app metadata in:

- `app/layout.tsx`
- `app/page.tsx`
- `app/brief/page.tsx`
- `app/termeni/page.tsx`
- `app/confidentialitate/page.tsx`

The metadata now includes:

- Better page titles
- Title template
- Meta description
- SEO keywords
- Canonical URLs
- Open Graph metadata
- Twitter card metadata
- Robots indexing metadata
- Proper `metadataBase`

### Structured Data

Added JSON-LD structured data on the homepage in:

- `app/page.tsx`

Structured data includes:

- `Organization`
- `WebSite`
- `ProfessionalService`

This helps Google understand the site as a Romanian software/web services business.

### Robots File

Added:

- `app/robots.ts`

It allows normal crawling, blocks API routes, and points crawlers to:

```txt
https://mdisoftware.dev/sitemap.xml
```

### Sitemap

Added:

- `app/sitemap.ts`

The sitemap currently exposes:

- `https://mdisoftware.dev/`
- `https://mdisoftware.dev/brief/`
- `https://mdisoftware.dev/confidentialitate/`
- `https://mdisoftware.dev/termeni/`

The live sitemap was verified in the browser at:

```txt
https://mdisoftware.dev/sitemap.xml
```

## Validation Done

The project was checked with:

```bash
npm run lint
npm run build
```

The build passed and generated:

- `/robots.txt`
- `/sitemap.xml`

## Google Search Console Steps

### Property Verification

The domain property was verified in Google Search Console for:

```txt
mdisoftware.dev
```

Verification was done through DNS using Cloudflare.

In Romanian Search Console UI, the domain verification flow used:

- `Adauga un site`
- Domain property
- TXT verification record
- Cloudflare DNS
- `Finalizeaza confirmarea`

### Sitemap Submission

In Search Console:

1. Go to `Sitemaps`
2. Submit:

```txt
sitemap.xml
```

or the full URL:

```txt
https://mdisoftware.dev/sitemap.xml
```

Current result:

- Status: `Succes`
- Pages discovered: `4`

This means Google can read the sitemap successfully.

### URL Inspection and Indexing Requests

Use the top search bar:

```txt
Inspecteaza orice adresa URL din "mdisoftware.dev"
```

Inspect these URLs one by one:

```txt
https://mdisoftware.dev/
https://mdisoftware.dev/brief/
https://mdisoftware.dev/termeni/
https://mdisoftware.dev/confidentialitate/
```

For each URL:

1. Inspect the URL
2. Click `Testeaza adresa URL live`
3. If Google says the URL can be indexed, click `Solicita indexarea`

## Current Search Console Status

For the homepage, Search Console showed:

```txt
Adresa URL nu este pe Google
Pagina nu este indexata: Descoperita - nu este indexata
Indexarea a fost solicitata
```

This is normal for a new or recently updated site.

Meaning:

- Google discovered the page through the sitemap.
- Google has not fully indexed it yet.
- An indexing request has already been submitted.

## Expected Timeline

Indexing is not instant.

Typical timing:

- A few hours in the best case
- 1-3 days is normal
- Sometimes longer for new domains

Useful searches to check progress:

```txt
site:mdisoftware.dev
MDI Software mdisoftware.dev
```

## Important Notes

- Code changes must be pushed to GitHub and deployed on Vercel before Google can see them.
- Search Console can show old statuses for a while even after the live site is fixed.
- The sitemap page showing XML in the browser is normal.
- The message "This XML file does not appear to have any style information associated with it" is normal and not an error.

## Next Recommended SEO Improvements

Add more indexable content over time:

- Dedicated service page for website de prezentare
- Dedicated service page for magazine online / ecommerce
- Dedicated service page for aplicatii web custom
- Case study page for the handmade ecommerce project
- More homepage copy using natural Romanian search terms
- Business contact details and location/service area if relevant

These are not required for indexing, but they help Google better understand and rank the website.
