# Portal Client

A modern web portal built with Next.js 15, TypeScript, and shadcn/ui.

## 🔗 Links

- **Live Demo:** [https://portal-client-ecru.vercel.app](https://portal-client-ecru.vercel.app)
- **Repository:** [https://github.com/vijayakumar1069/portal-client.git](https://github.com/vijayakumar1069/portal-client.git)

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/vijayakumar1069/portal-client.git
   cd portal-client
   npm install
   ```

2. **Environment Setup**
   
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_NODE_DEV=development
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   NEXT_PUBLIC_PRODUCTION_BACKEND_URL=https://your-production-api.com
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 🛠 Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Hook Form + Zod** - Forms and validation

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # Reusable components
├── hooks/                  # Custom hooks
├── lib/                    # Utilities
└── schema/                 # Validation schemas
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linting
```

## 🌟 Features

- Authentication system
- Dashboard interface
- Ticket management
- User portal
- Dark/light theme
- Responsive design

## 🚀 Deployment

Deploy to Vercel:
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

## 📋 Requirements

- Node.js 18+
- npm/yarn/pnpm

---

Built with Next.js 15 & TypeScript
