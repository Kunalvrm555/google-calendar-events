
# Google Calendar Events

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

Welcome to the **Google Calendar Events**! This web application allows users to securely log in using their Google account and view their calendar events in a clean, organized table format. With intuitive filtering options, users can effortlessly sort events by date, ensuring they stay on top of their schedules.

## Features

- **Google Single Sign-On (SSO):** Secure and seamless authentication using Google accounts.
- **Display Calendar Events:** Fetch and display all Google Calendar events in a user-friendly table.
- **Date Filtering:** Easily filter events by specific date ranges to focus on what's important.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Dark Mode:** Toggle between light and dark themes for a personalized viewing experience.
- **Interactive UI:** Enhanced with Material-UI components for a modern and intuitive interface.
- **Real-time Feedback:** Instant notifications using toast messages to keep users informed.

## Demo

![Screenshot of the Application](https://via.placeholder.com/800x400)

## Technologies Used

- **[React](https://reactjs.org/):** A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/):** A fast frontend build tool.
- **[Material-UI (MUI)](https://mui.com/):** React components for faster and easier web development.
- **[Redux](https://redux.js.org/):** A predictable state container for JavaScript apps.
- **[React Hot Toast](https://react-hot-toast.com/):** Elegant notifications for your React app.
- **[React OAuth Google](https://github.com/ManishSinghal/react-oauth-google):** Simplified Google OAuth integration.
- **[Axios](https://axios-http.com/):** Promise-based HTTP client for the browser and Node.js.

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

- **[Node.js](https://nodejs.org/en/)** (v14 or later)
- **[npm](https://www.npmjs.com/)** or **[Yarn](https://yarnpkg.com/)** package manager

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Kunalvrm555/google-calendar-events.git
   cd google-calendar-events
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

### Configuration

1. **Set Up Environment Variables**

   - Create a `.env` file in the root directory of the project.
   - Refer to the `.env.example` file for the required environment variables.

   ```bash
   cp .env.example .env
   ```

2. **Configure `.env` File**

   Open the `.env` file and add your Google OAuth Client ID:

   ```env
   VITE_CLIENT_ID=your-google-oauth-client-id
   ```

   > **Note:** Replace `your-google-oauth-client-id` with your actual Google OAuth Client ID. You can obtain this from the [Google Cloud Console](https://console.cloud.google.com/).

### Running the Application

Start the development server with the following command:

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

The application will be available at `http://localhost:5173` (default port for Vite).

## Deployment

To build and deploy the application, follow these steps:

1. **Build the Application**

   Using npm:

   ```bash
   npm run build
   ```

   Or using Yarn:

   ```bash
   yarn build
   ```

   This will generate optimized production-ready files in the `dist` directory.

2. **Deploy to a Hosting Service**

   You can deploy the `dist` folder to any static site hosting service such as:

   - **[Vercel](https://vercel.com/)**
   - **[Netlify](https://www.netlify.com/)**
   - **[GitHub Pages](https://pages.github.com/)**
   - **[Firebase Hosting](https://firebase.google.com/docs/hosting)**

   Follow the respective hosting service's documentation for detailed deployment instructions.

## Project Structure

```
google-calendar-events/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CalendarEvents.jsx
│   │   ├── DateTimeDisplay.jsx
│   │   ├── EventTable.jsx
│   │   └── Filter.jsx
│   ├── redux/
│   │   ├── authSlice.js
│   │   └── calendarSlice.js
│   ├── styles/
│   │   └── styles.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

- **`public/`**: Contains the `index.html` file and other static assets.
- **`src/`**: Contains the source code.
  - **`components/`**: Reusable React components.
  - **`redux/`**: Redux slices and store configuration.
  - **`styles/`**: Global CSS styles.
  - **`App.jsx`**: Main application component.
  - **`main.jsx`**: Entry point of the application.
- **`.env.example`**: Sample environment variables file.
- **`package.json`**: Project dependencies and scripts.
- **`vite.config.js`**: Vite configuration file.
- **`README.md`**: Project documentation.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material-UI](https://mui.com/)
- [Redux](https://redux.js.org/)
- [React Hot Toast](https://react-hot-toast.com/)
- [React OAuth Google](https://github.com/ManishSinghal/react-oauth-google)
- [Axios](https://axios-http.com/)
- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)

---