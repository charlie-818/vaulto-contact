# ITT Website - Asset Tokenization Platform

A modern Next.js application for asset tokenization, built with TypeScript and Tailwind CSS, deployed on Netlify with integrated form handling.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Netlify Forms** for form submission handling
- **Responsive design** optimized for all devices
- **Professional UI** with blockchain-themed animations

## Form Handling

The website uses Netlify Forms to automatically capture and manage form submissions. The form includes:

- Goal selection (Tokenize vs Invest)
- Contact information (name, email, company, phone)
- Asset-specific fields (type, value, investment range)

### Accessing Form Submissions

1. Go to your Netlify dashboard
2. Select your site
3. Navigate to **Forms** in the sidebar
4. View all submissions for the "intent-form"

### Setting Up Notifications

To receive email notifications for new form submissions:

1. In your Netlify dashboard, go to **Site settings** > **Forms**
2. Click **Form notifications**
3. Add email addresses to receive notifications
4. Optional: Set up Slack or webhook integrations

## Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd itt-website
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

**Note:** Netlify Forms will not work in local development. Form submissions will show the success message but won't be processed until deployed to Netlify.

### Build

```bash
npm run build
```

## Deployment

### Netlify Deployment

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: Auto-detected
3. **Deploy**: Netlify will automatically deploy on push to main branch

### Form Configuration

The form is automatically detected by Netlify during build time through:
- `data-netlify="true"` attribute on the form
- Hidden form in the layout for build-time detection
- Proper field naming and structure

## Project Structure

```
itt-website/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and animations
│   │   ├── layout.tsx           # Root layout with hidden form
│   │   └── page.tsx             # Home page
│   └── components/
│       └── IntentForm.tsx       # Main form component
├── public/                      # Static assets
├── netlify.toml                 # Netlify configuration
└── package.json
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Netlify Forms** - Form handling
- **Framer Motion** - Animations (if needed)

## License

This project is proprietary and confidential.
