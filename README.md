# AB Wall Wonders - Interior Design Website

A modern, responsive website for AB Wall Wonders, specializing in premium wallpapers, flooring, and blinds installation services.

## 🌟 Features

- **Modern Design**: Clean, professional interface with green color scheme
- **Mobile-First**: Fully responsive design optimized for all devices
- **Service Pages**: Dedicated pages for Wallpapers, Flooring, and Blinds
- **Project Gallery**: Showcase of completed projects with before/after images
- **Contact Forms**: Integrated contact and quote request forms
- **Notion Integration**: Form submissions stored in Notion database
- **Email Notifications**: Automated email notifications for new inquiries
- **SEO Optimized**: Proper meta tags and structured data

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** for accessible components
- **React Router** for navigation
- **React Hook Form** for form handling

### Backend
- **Express.js** server
- **Notion API** for data storage
- **Nodemailer** for email notifications
- **Zod** for data validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Notion account (for form submissions)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sateesh23/ABWW.git
cd ABWW
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
# Notion Integration
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient@gmail.com
```

5. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── lib/               # Utility functions and services
│   └── data/              # Static data files
├── server/                # Backend Express server
│   ├── api/               # API endpoints
│   └── routes/            # Route handlers
├── public/                # Static assets
│   └── images/            # Image assets
└── shared/                # Shared types and utilities
```

## 🎨 Services

### Wallpapers
- Premium quality wallpapers
- 8 different types including 3D, Mural, Geometric
- 5-year warranty
- Professional installation

### Flooring
- Vinyl flooring, Artificial grass, Cushion mats
- Waterproof and durable options
- 2-year warranty
- Expert installation

### Blinds
- 8 types including Roller, Zebra, Roman, Wooden
- Custom measurements
- 2-year warranty
- Professional fitting

## 📱 Contact Information

- **Phone**: 8500900827, 8688723648
- **Email**: abwollwonders@gmail.com
- **Address**: Shop No: 06, Municipal Shopping Complex, Opp. Govt.Hospital, Bobbili, Vizianagaram Dist.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📄 License

This project is private and proprietary to AB Wall Wonders.

## 🤝 Contributing

This is a private project. For any changes or updates, please contact the development team.
