# Deployment Guide

## Netlify Deployment

This project is configured for easy deployment on Netlify with the included `netlify.toml` configuration.

### Prerequisites

1. Node.js 18 or higher
2. A Netlify account
3. Email service provider credentials

### Environment Variables

Set the following environment variables in your Netlify dashboard:

```
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_FROM="Vaulto Notifier" <noreply@vaulto.ai>
```

### Production Email Services

For production, replace Mailtrap with a real email service:

#### Gmail
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### SendGrid
```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

### Deployment Steps

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**: 
   - Build command: `npm run build` (auto-detected from netlify.toml)
   - Publish directory: Auto-detected by @netlify/plugin-nextjs
   - Functions directory: Auto-detected by @netlify/plugin-nextjs
3. **Environment Variables**: Add the email configuration variables in Netlify dashboard
4. **Deploy**: Netlify will automatically deploy when you push to your main branch

### Important Notes

- The project uses `@netlify/plugin-nextjs` for optimal Next.js deployment
- API routes are automatically converted to Netlify Functions
- No manual publish directory configuration needed
- Static assets are optimized automatically

### Troubleshooting

If you get a 404 error:
1. Ensure the `@netlify/plugin-nextjs` plugin is enabled
2. Check that environment variables are set correctly
3. Verify the build completed successfully
4. Check Netlify function logs for API route errors

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with your environment variables
4. Run development server: `npm run dev`
5. Test build: `npm run build`

### Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript support
- ✅ Custom CSS styling
- ✅ Email form submission via Netlify Functions
- ✅ Responsive design
- ✅ Production-ready build
- ✅ Netlify optimized configuration with plugin 