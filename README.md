# Rev James Blog System

A complete, modern blog system built with Next.js, Tailwind CSS, and Supabase. Features a secret admin panel, reader interactions (likes, comments, sharing), and SEO optimization.

## 🚀 Features

### Admin Features
- **Secret Admin Panel** (`/secret-admin-panel`) - Password-protected blog management
- **Rich Content Editor** - HTML support with live preview
- **Image Upload** - Drag-and-drop image uploads to Supabase Storage
- **Draft System** - Save drafts and publish when ready
- **SEO Tools** - Meta descriptions, tags, and URL slugs
- **Analytics** - View counts and like tracking

### Reader Features
- **Like System** - IP-based like tracking (prevents spam)
- **Comment System** - Moderated comments with approval workflow
- **Social Sharing** - Twitter, Facebook, LinkedIn, and copy link
- **Responsive Design** - Optimized for all devices
- **Fast Loading** - Static generation with ISR
- **SEO Optimized** - Meta tags, structured data, Open Graph

### Technical Features
- **Supabase Backend** - PostgreSQL database with real-time capabilities
- **File Storage** - Supabase Storage for images and assets
- **Security** - Row Level Security (RLS) policies
- **Performance** - Optimized queries and caching
- **Migration Tools** - Import existing MDX blogs

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Heroicons
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd rev-james-blog
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase** (see detailed guide below)
4. **Configure environment variables**
5. **Run the development server**
```bash
npm run dev
```

## 🔧 Supabase Setup

### Quick Setup
1. Create a Supabase project at [app.supabase.com](https://app.supabase.com)
2. Run the SQL script from `supabase-setup.sql` in your Supabase SQL Editor
3. Configure environment variables in `.env.local`
4. Start creating blogs!

### Detailed Setup
See [SUPABASE_BLOG_SETUP.md](./SUPABASE_BLOG_SETUP.md) for complete setup instructions.

## 🌍 Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Panel Security
ADMIN_PASSWORD=your_secret_admin_password

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe Configuration (existing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## 📝 Usage

### Creating Your First Blog Post

1. **Access Admin Panel**
   - Visit `/secret-admin-panel`
   - Enter your admin password

2. **Create New Blog**
   - Click "Create New Blog"
   - Fill in the form:
     - **Title**: Your blog post title
     - **Slug**: URL-friendly version (auto-generated)
     - **Content**: Your blog content (supports HTML)
     - **Featured Image**: Upload an image (optional)
     - **Tags**: Add relevant tags
     - **Published**: Check to make it live

3. **Publish**
   - Click "Create Blog"
   - Visit `/blogs/your-slug` to see your blog post

### Managing Comments

Comments are moderated by default. To approve comments:

1. Access your Supabase dashboard
2. Go to Table Editor → `comments`
3. Set `approved` to `true` for comments you want to show

### Content Guidelines

- **HTML Support**: Use HTML tags for rich formatting
- **Images**: Upload through the admin panel for best performance
- **SEO**: Add meta descriptions and relevant tags
- **Structure**: Use H2 and H3 headings for table of contents

## 🔄 Migration from Existing Blogs

If you have existing MDX blog files, use the migration script:

```bash
# Install additional dependencies
npm install gray-matter dotenv

# Run migration
node migrate-blogs.js
```

This will import all your existing blog posts from the `content/blogs/` directory.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── blogs/[slug]/          # Dynamic blog pages
│   ├── secret-admin-panel/    # Admin interface
│   └── api/                   # API routes
├── components/
│   ├── Blog/                  # Blog-related components
│   │   ├── BlogInteractions.js
│   │   ├── CommentSection.js
│   │   └── ...
│   └── ...
├── lib/
│   └── supabase.js           # Supabase client and operations
└── utils/
    └── ...

Database Tables:
├── blogs                     # Main blog posts
├── comments                  # User comments
└── likes                     # Like tracking
```

## 🔒 Security

- **Admin Authentication**: Password-based (can be extended)
- **Database Security**: Row Level Security (RLS) policies
- **Comment Moderation**: All comments require approval
- **Input Sanitization**: XSS protection
- **File Upload**: Type and size validation

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
ADMIN_PASSWORD=your_secure_production_password
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 📊 Analytics & Monitoring

- **View Tracking**: Automatic view count increment
- **Like Analytics**: Track popular posts
- **Admin Dashboard**: View post performance
- **Supabase Dashboard**: Monitor database usage

## 🔧 Customization

### Styling
- Built with Tailwind CSS
- Uses your existing design system
- Fully responsive components

### Features
- Easy to extend with new functionality
- Modular component architecture
- Clean API structure

### Admin Panel
- Simple password authentication
- Can be extended with proper user management
- Responsive admin interface

## 🆓 Cost Breakdown

### Supabase Free Tier
- **Database**: 500MB
- **Storage**: 1GB  
- **Bandwidth**: 2GB/month
- **API Requests**: 50,000/month

### Vercel Free Tier
- **Bandwidth**: 100GB/month
- **Function Executions**: 100GB-hours/month
- **Custom Domains**: Included

**Total Cost**: $0/month for most blogs!

## 🐛 Troubleshooting

### Common Issues

1. **"Unauthorized" errors**
   - Check environment variables
   - Verify admin password

2. **Database connection errors**
   - Verify Supabase URL and keys
   - Check if project is active

3. **Images not uploading**
   - Ensure `blog-assets` bucket exists
   - Check file size (max 5MB)

4. **Comments not showing**
   - Comments require approval
   - Check `approved` field in database

### Getting Help

1. Check browser console for errors
2. Review Supabase dashboard for issues
3. Verify all environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Heroicons](https://heroicons.com/)

---

## 🚀 Quick Start Checklist

- [ ] Create Supabase project
- [ ] Run `supabase-setup.sql` in SQL Editor
- [ ] Configure `.env.local` with Supabase credentials
- [ ] Set admin password
- [ ] Run `npm install && npm run dev`
- [ ] Visit `/secret-admin-panel` and create your first blog
- [ ] Test likes, comments, and sharing features
- [ ] Deploy to production

**Happy blogging! 🎉**
