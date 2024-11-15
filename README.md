<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About This Project

This project is built using Laravel's powerful web application framework combined with Inertia.js and React, offering a robust full-stack solution. It integrates key components like phpMyAdmin for database management, MySQL as the database server, Apache2 for the web server, and Laravel Breeze and Spatie packages for authentication and authorization.

The MVC pattern is strictly followed, ensuring a clean separation between logic and views, allowing for maintainable and scalable code.

### Key Features:
- Laravel MVC architecture.
- [phpMyAdmin](https://www.phpmyadmin.net/) integration for MySQL database management.
- Inertia.js to connect Laravel back-end with React components for the front-end.
- Laravel Breeze for authentication scaffolding.
- Spatie for advanced authorization.
- Apache2 server configuration for local development.
- Faculty management system integrated with user authentication.
- Semester note handling for academic projects.

## Learning Inertia.js and React in Laravel

Inertia.js and React make the frontend development process smooth by allowing you to build modern, reactive interfaces while utilizing Laravel for backend logic. Below are the core technologies used:

- **Laravel** as the backend framework with a strong emphasis on MVC.
- **Inertia.js** to bridge the backend with React components without writing a traditional API.
- **React** for building highly interactive and modular UI components.

## Installation

To set up the project on your local environment, follow these steps:

### Prerequisites:
1. **PHP** >= 8.0
2. **Composer** for managing PHP dependencies.
3. **Node.js** and **npm** for managing frontend dependencies.
4. **MySQL** as the database server.
5. **Apache2** as the web server (optional but recommended).
6. **phpMyAdmin** for easy database management.

### Steps to Clone and Set Up the Project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. **Install PHP dependencies using Composer**:
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

4. **Create a `.env` file**:
   ```bash
   cp .env.example .env
   ```
   - Open the `.env` file and update the database configuration:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=your_database_name
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```

5. **Generate an application key**:
   ```bash
   php artisan key:generate
   ```

6. **Run database migrations**:
   ```bash
   php artisan migrate
   ```

7. **Build front-end assets**:
   ```bash
   npm run dev
   ```
   - For production, use:
     ```bash
     npm run build
     ```

8. **Start the development server**:
   ```bash
   php artisan serve
   ```
   - The application should now be accessible at `http://localhost:8000`.

### Optional: Run Apache2 Server
If you prefer using Apache2, ensure your virtual host configuration points to the `public` directory of the Laravel project.

### Conclusion
Your Laravel project is now set up with Inertia.js and React. Enjoy building your application!

