# MDI Software Foundation Stack

## Recommended Stack

- Framework: Next.js with App Router.
- Language: TypeScript.
- Styling: Tailwind CSS.
- UI approach: custom responsive components with selected reusable primitives.
- Icons: lucide-react.
- Hero animation: Three.js WebGL scene.
- Forms: React Hook Form.
- Validation: Zod with `@hookform/resolvers`.
- Email / CRM integration: Brevo API.
- Hosting target: Vercel.

## Why This Stack

Next.js gives the project a strong base for a presentation website with good SEO, fast routing, and server-side endpoints. It also lets the Brevo integration live safely on the server so the API key is never exposed in browser code.

TypeScript and Zod make the guided project brief reliable because the form has structured data: project type, budget, style, sections, features, contact information, and recommendations.

Tailwind CSS keeps the first version quick to build while still allowing a custom MDI Software visual identity instead of a generic template look.

## Integration Shape

```txt
Client wizard form
-> Next.js API route at /api/lead
-> Zod validation
-> Brevo contact creation
-> Optional Brevo transactional notification email
-> Success or error state in the UI
```

## Environment Variables

```txt
BREVO_API_KEY=
BREVO_LIST_ID=
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=MDI Software
MDI_CONTACT_EMAIL=
```

## Initial Dependencies

```txt
next
react
react-dom
typescript
tailwindcss
postcss
autoprefixer
lucide-react
three
react-hook-form
zod
@hookform/resolvers
@getbrevo/brevo
```

## First Implementation Scope

- Single-page presentation website.
- Responsive landing page.
- Code-generated animated hero background.
- Services, pricing, projects, and experience sections.
- Guided project brief wizard.
- Server-side Brevo-ready lead endpoint.
- Local preview mode when Brevo environment variables are not configured.
