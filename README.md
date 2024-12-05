# Red-Steam Frontend

Red-Steam is a comprehensive web application that functions as a Steam clone, designed to manage game libraries, user accounts, and more. This project serves as both a learning exercise and a demonstration of my web development skills. It has allowed me to explore and apply technologies such as Next.js, React, Redux Toolkit, and RTK Query in a real-world and challenging context.

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

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or above).
- [pnpm](https://pnpm.io/) package manager.

### Steps

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
   Copy the sample.env file and rename it to .env.local and update the values according to your local environment.

4. **Run the development server**:
   ```bash
   pnpm dev
   ```
5. **Open http://localhost:3000 (or the port you've configured) in your browser.**

## Known Issues

The following features are currently under development or not functioning as intended:

- **Navbar Links**: The links on the navbar are static placeholders and are not functional yet.
- **Notifications**: Notifications are a placeholder and not yet integrated.
- **Your Queue**: The "Your Queue" feature is not integrated yet and is currently not working.
- **Community Features**: All community-based features are disabled as the community system is not implemented yet.

## Requirements

This project should be run alongside the [Red-Steam Backend](https://github.com/IbrahemHadidy/red-steam-backend). Ensure that the backend is up and running at `http://localhost:4000/api` or modify the `NEXT_PUBLIC_BACKEND_API_URL` in your `.env.local` file as needed.

## Build for Production

1. **Build the application:**
   ```bash
   pnpm build
   ```
2. **Start the production server:**
   ```bash
   pnpm start
   ```

## Future Plans

If the project continues, the following features are planned for potential development:

- **Chat System**: Real-time messaging between users.
- **Community Features**: Interactive forums, group chats, user-managed groups, and event scheduling.
- **Enhanced User Profiles**: Public and private profile views with customizable settings.

## Contributing

This project is a personal endeavor, so contributions are not currently being accepted.
