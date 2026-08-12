# Brevo setup for MDI Software

The website already sends both lead types through local API routes:

- Guided brief: `/api/lead`
- Quick contact form: `/api/contact`

## Required environment variables

Create `.env.local` from `.env.example`:

```bash
BREVO_API_KEY=xkeysib-your-key
BREVO_LIST_ID=1
BREVO_BRIEF_LIST_ID=
BREVO_CONTACT_LIST_ID=
BREVO_SENDER_EMAIL=contact@mdi-software.ro
BREVO_SENDER_NAME=MDI Software
MDI_CONTACT_EMAIL=contact@mdi-software.ro
BREVO_USE_CUSTOM_ATTRIBUTES=false
```

`BREVO_LIST_ID` is the fallback list used by both forms. If you want separate Brevo lists, set `BREVO_BRIEF_LIST_ID` and `BREVO_CONTACT_LIST_ID`.

## Brevo account checklist

1. Create or copy an API key from Brevo.
2. Verify the sender email/domain in Brevo before sending transactional emails.
3. Create a contacts list and copy its numeric list ID.
4. Add the variables above to `.env.local` locally and to the production host.
5. Restart the Next.js server after changing env values.

## Optional custom contact attributes

By default, the site only writes standard contact attributes to Brevo and sends the full form details by transactional email. This avoids API failures if custom attributes do not exist yet in Brevo.

To also store project details directly on the Brevo contact, create these custom attributes in Brevo first, then set:

```bash
BREVO_USE_CUSTOM_ATTRIBUTES=true
```

Suggested attributes:

- `PROJECT_TYPE`
- `PROJECT_GOAL`
- `BUDGET`
- `TIMELINE`
- `RECOMMENDED_PACKAGE`
- `LEAD_SOURCE`

Brevo requires custom contact attributes to already exist before they can be written through the contacts API.
