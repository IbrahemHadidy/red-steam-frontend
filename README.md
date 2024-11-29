# Red-Steam Frontend

Red-Steam is a comprehensive web application that functions as a Steam-clone, designed to manage game libraries, user accounts, and more. This repository contains the frontend built with Next.js, utilizing modern React features and Redux Toolkit for state management.

## Features

- User-friendly interface to manage game libraries.
- Dynamic routing with Next.js.
- State management powered by Redux Toolkit and RTK Query.
- Modular architecture for scalability and maintainability: The application is structured into modular components and features, making it easy to develop, test, and extend each part independently. This approach allows for efficient management of code, better separation of concerns, and facilitates parallel development.
- Custom admin panels for full content and user management.
- Dynamic forms for creating, updating, and managing game details, media, and promotional offers.
- User role management and permissions for different admin statuses.
- Advanced search functionality with filters, similar to Steam's search experience.
- Custom media carousels for game media presentation, similar to Steam.
- Secure authentication and user authorization.
- User profile management with account settings.
- Sandbox environment for testing PayPal payment integration.
- Integrated game shopping cart, wishlist, and purchase workflow.

## Technologies

- **Next.js 15** (with the App Router) for advanced routing
- **React 19**
- **Redux Toolkit** for simplified state management.
- **RTK Query** for data fetching and caching.
- **TypeScript** for ensuring type safety and better maintainability while scaling.
- **SCSS** for a maintainable CSS.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/IbrahemHadidy/red-steam-frontend.git
   cd red-steam-frontend
   ```
2. **Install dependencies using pnpm**:
   ```bash
   pnpm install
   ```
3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following (all keys are for development use only):
   ```bash
   NEXT_PUBLIC_BASE_PATH="http://localhost:3000"
   NEXT_PUBLIC_BACKEND_API_URL="http://localhost:4000"
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
   NEXT_PUBLIC_PAYPAL_CLIENT_ID="ARb1hskRsE2V52bofRMIrK-0S5q369ETWmJ6hsQWPOQEndYGbGgIHsgSgTFEwnkXiPV99ljpkDlPBk0A"
   ```
4. **Run the development server**:
   ```bash
   pnpm dev
   ```
5. **Open http://localhost:3000 in your browser.**

## Requirements

- This project should be run alongside the [Red-Steam Backend](https://github.com/IbrahemHadidy/red-steam-backend). Ensure that the backend is up and running at `http://localhost:4000` or modify the `NEXT_PUBLIC_BACKEND_API_URL` in your `.env.local` file as needed.

## Build for Production

1. **_Build the application:_**
   ```bash
   pnpm build
   ```
2. **_Start the production server:_**
   ```bash
   pnpm start
   ```

## Contributing

Feel free to submit issues or pull requests to contribute to this project.
