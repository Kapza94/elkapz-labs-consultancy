# elkapz-labs-consultancy

Premium bilingual landing page for elkapz labs, an AI implementation and automation business based in Belgrade.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contact Form

Copy `.env.example` to `.env.local` and set:

```bash
GMAIL_USER=your-address@gmail.com
GMAIL_APP_PASSWORD=your-google-app-password
CONTACT_TO_EMAIL=your-destination@gmail.com
```

`CONTACT_TO_EMAIL` is optional and defaults to `GMAIL_USER`.

For Gmail delivery:

1. Enable Google Two-Step Verification.
2. Create a 16-character Google App Password.
3. Use the app password for `GMAIL_APP_PASSWORD`, not the normal Gmail password.

## Quality Checks

```bash
npm run check
npm run build
```

## Branches

- `feature/landing-page`: active implementation
- `dev`: integration branch
- `main`: release branch
