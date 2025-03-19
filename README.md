
# AllWillRetire - Cryptocurrency Landing Page

## Project Info

A modern, responsive landing page for the AllWillRetire cryptocurrency.

## How to download and run this project locally

### Prerequisites

Make sure you have Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup and Installation

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

# Step 5: To build the project for production
npm run build

# Step 6: To preview the production build locally
npm run preview
```

## Build for production

To create a production-ready build that you can host anywhere:

```sh
npm run build
```

This will create a `dist` folder with all the static files you need. You can upload these files to any static hosting service like:

- Netlify
- Vercel
- GitHub Pages
- Amazon S3
- etc.

## Performance Optimizations

This project includes:

- Image optimization with the OptimizedImage component
- React Suspense and lazy loading for code splitting
- Tailwind CSS for utility-first styling and small bundle size
- Manual chunk splitting in the Vite configuration
- Preloading of critical assets
- Debounced event handlers
- Query caching with Tanstack Query

## Project Technologies

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Recharts for data visualization

## SEO Optimizations

The site includes:
- Proper meta tags for SEO
- Open Graph and Twitter Card meta tags for social sharing
- Semantic HTML structure
- Optimized loading times

## Customization

- Edit content in the component files under `src/components/`
- Modify styles in the CSS files or directly in Tailwind classes
- Adjust theme settings in `tailwind.config.ts`

## Contact

For support or inquiries, please reach out to the team at contact@allwillretire.com

