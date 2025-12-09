<div align="center">
  <img src="./src/assets/Neverland Games Store.png" alt="Neverland Store Logo" width="120" />
  <h1 align="center">Neverland Store Frontend</h1>
  <p align="center">
    A modern and responsive web frontend for Neverland Store, a premium gaming top-up platform.
    <br />
    <a href="#-key-features"><strong>Explore the features »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Isaki-Prananda/neverland-store/issues">Report Bug</a>
    ·
    <a href="https://github.com/Isaki-Prananda/neverland-store/issues">Request Feature</a>
  </p>
</div>

---

## About The Project

<!-- Ganti URL ini dengan URL screenshot aplikasi Anda -->


The official web storefront for Neverland Store. This is a feature-rich single-page application (SPA) designed to provide a seamless and premium experience for gamers looking to top-up their favorite games. The project showcases a modern frontend architecture, a sleek user interface, and a fully responsive design.

This repository contains the complete frontend source code, containerized with Docker for easy deployment and consistent development environments.

### ✨ Key Features

*   **Modern & Responsive UI**: Sleek dark-mode interface built with Tailwind CSS, ensuring a great experience on all devices.
*   **Dynamic Game Catalog**: Browse, filter, and sort a list of popular games.
*   **Interactive Modals**: Seamless user experience for game details, authentication (Sign In/Sign Up), and shopping cart.
*   **State Management**: Clean and efficient state management using React Hooks.
*   **Scroll Spy Navigation**: The header navigation automatically highlights the section currently in view.
*   **Containerized**: Ready to deploy with Docker and Nginx for optimal performance and scalability.

### 🛠️ Tech Stack

This project is built with a modern and robust technology stack:

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A next-generation frontend tooling that provides an extremely fast development experience.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **Lucide React**: A beautiful and consistent icon toolkit.
*   **Docker**: A platform for developing, shipping, and running applications in containers.
*   **Nginx**: A high-performance web server used to serve the production build.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

*   Node.js (v18.x or later recommended)
*   npm (comes with Node.js)
*   Docker & Docker Compose (for containerized deployment)

### Installation & Local Development

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Isaki-Prananda/neverland-store.git
    cd neverland-store
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 🐳 Running with Docker

This is the recommended way to run the application in a production-like environment.

1.  **Build and run the container:**
    From the root directory of the project, run:
    ```sh
    docker-compose up -d --build
    ```

2.  **Access the application:**
    Open your browser and navigate to `http://localhost:8080`.

To stop the container, run:
```sh
docker-compose down
```

---

## 📂 Project Structure

The project follows a standard React application structure:

```
neverland-store-frontend/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, fonts, etc.
│   ├── components/          # Reusable React components
│   ├── data/                # Static data for the app
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Entry point of the application
├── .dockerignore            # Files to ignore in Docker build
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Instructions to build the Docker image
├── nginx.conf               # Nginx configuration for serving the app
├── package.json
└── README.md
```

---

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.

Copyright (c) 2025 Muhammad Isaki Prananda
