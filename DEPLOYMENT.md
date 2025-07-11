# Deployment Guide

## Netlify Deployment

This project is configured for easy deployment on Netlify with the included `netlify.toml` configuration and uses Netlify Forms for form handling.

### Prerequisites

1. Node.js 18 or higher
2. A Netlify account

### Form Handling

The project uses Netlify Forms for automatic form submission handling. The form is configured with:
- `data-netlify="true"` attribute for auto-detection
- `name="intent-form"` for form identification
- Hidden `form-name` field for proper processing

Form submissions will be automatically captured by Netlify and can be viewed in the Netlify dashboard under "Forms".

### Deployment Steps

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**: 
   - Build command: `npm run build` (auto-detected from netlify.toml)
   - Publish directory: Auto-detected by @netlify/plugin-nextjs
   - Functions directory: Auto-detected by @netlify/plugin-nextjs
3. **Deploy**: Netlify will automatically deploy when you push to your main branch

### Form Notifications

To receive notifications when forms are submitted:

1. Go to your Netlify dashboard
2. Navigate to **Site settings** > **Forms**
3. Configure **Form notifications** to receive emails or webhook notifications
4. Set up **Slack** or **Email** notifications as needed

### Important Notes

- The project uses `@netlify/plugin-nextjs` for optimal Next.js deployment
- Form submissions are automatically handled by Netlify Forms
- No custom API routes needed for form processing
- Static assets are optimized automatically
- All form data is stored securely in Netlify's dashboard

### Troubleshooting

If forms are not working:
1. Ensure the form has `data-netlify="true"` attribute
2. Check that the form has a `name` attribute
3. Verify the hidden `form-name` field is present
4. Check the Netlify Forms dashboard for submissions
5. Ensure the build completed successfully

If you get a 404 error:
1. Ensure the `@netlify/plugin-nextjs` plugin is enabled
2. Check that the build completed successfully
3. Verify static assets are loading correctly

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Access the site at `http://localhost:3000`

Note: Netlify Forms will not work in local development. Form submissions will show the success message but won't be processed until deployed to Netlify. 