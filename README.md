# PROMETHIX3D

Promethix3D is a modern, high-performance e-commerce platform specializing in 3D printed products, custom mechanical parts, and unique desk decor. The application is built with a focus on premium aesthetics, smooth animations, and mobile optimization.

## Features

- **Product Catalog**: Browse a curated collection of 3D printed items with rich details and imagery.
- **Custom Orders**: Request custom 3D prints for mechanical parts or unique gifts.
- **Cart System**: Fully functional shopping cart with state management.
- **User Authentication**: Secure login and sign-up via Clerk.
- **High-Performance UI**:
    - **Code Splitting**: Route-based lazy loading for fast initial paint.
    - **Optimized Assets**: Image optimization and lazy loading to prevent layout shifts (CLS).
    - **Hardware Acceleration**: Smooth animations using GSAP and Framer Motion with GPU acceleration fixes.
- **Responsive Design**: Mobile-first approach with verified lighthouse performance fixes.

## Technical Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: React Context API (`cart-context`)
- **Animations**:
    - [Framer Motion](https://www.framer.com/motion/) (UI interactions)
    - [GSAP](https://gsap.com/) (Complex timeline animations)
- **Authentication**: [Clerk](https://clerk.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: Radix UI primitives with custom Tailwind styling.

## Project Structure

```bash
src/
├── assets/         # Static images and resources
├── components/     # Reusable UI components (ProductCard, LandingHero, etc.)
├── context/        # Global state (CartContext)
├── data/           # Static product data and configuration
├── layouts/        # Layout wrappers (AppLayout)
├── pages/          # Page components (LandingPage, Products, About, etc.)
├── lib/            # Utility functions (cn, formaters)
├── App.jsx         # Main application component with Lazy Loaded routes
└── main.jsx        # Entry point
```

## Performance Improvements

This project has undergone significant performance optimization:

1.  **Code Splitting**: All pages are lazy-loaded using `React.lazy()` and `Suspense`, significantly reducing the main bundle size.
2.  **LCP Optimization**: The main hero image is prioritized which `fetchPriority="high"` to improve Largest Contentful Paint.
3.  **CLS Fixes**: All images have explicit `width` and `height` attributes to prevent layout shifts during loading.
4.  **Mobile Optimizations**: Heavy glassmorphism effects are disabled on mobile, and scroll handlers are optimized.
5.  **SEO**: Full meta tag coverage for better search engine visibility.

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/promethix3d.git
    cd promethix3d
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Clerk key:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    ```

## Testing Performance

To verify performance improvements:
1.  Run the app locally (`npm run dev`) or build it (`npm run build`).
2.  Open Chrome DevTools -> **Lighthouse**.
3.  Run a "Mobile" audit.
4.  Observe improved scores in Performance, SEO, and Accessibility.

---

**Developed for Promethix3D**
