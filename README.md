# elkapz-labs-consultancy

Premium bilingual landing page for elkapz labs, an AI implementation and automation business based in Belgrade.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact Form

The contact form sends server-side through Resend. Create an account at
`https://resend.com`, create an API key, then copy `.env.example` to
`.env.local`.

```bash
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL="elkapz labs website <onboarding@resend.dev>"
CONTACT_TO_EMAIL=your-resend-account-email@example.com
```

### Test setup

Before verifying a domain, keep `onboarding@resend.dev` as the sender and set
`CONTACT_TO_EMAIL` to the email address attached to your Resend account.

### Production setup

1. Add a domain in the Resend dashboard.
2. Add the SPF and DKIM records Resend provides to your DNS provider.
3. Wait until Resend marks the domain as verified.
4. Change `RESEND_FROM_EMAIL` to a sender on that domain:

```bash
RESEND_FROM_EMAIL="elkapz labs <website@send.yourdomain.com>"
CONTACT_TO_EMAIL=elkapzlabs@gmail.com
```

Add the same three variables to the environment settings of the production
hosting provider. Never expose `RESEND_API_KEY` through a `NEXT_PUBLIC_`
variable.

## Quality Checks

```bash
npm run check
npm run build
```

## Branches

- `feature/*`: isolated implementation branches
- `dev`: integration branch
- `main`: release branch
