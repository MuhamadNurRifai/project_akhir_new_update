# Role Management System

A comprehensive role-based access control (RBAC) system built with Laravel backend and React frontend, featuring complete testing infrastructure and API documentation.

## 🚀 Features

### Core Functionality
- **Multi-role Authentication System** (Admin, PM, Team, Client)
- **Role-based Access Control** with granular permissions
- **User Management** with CRUD operations
- **Project Management** with role-based visibility
- **Task Management** with assignment capabilities
- **File Upload and Management**
- **Real-time Notifications**

### Security Features
- **JWT Token Authentication** with Laravel Sanctum
- **Role-based Middleware** for API protection
- **Input Validation** and sanitization
- **CSRF Protection**
- **Rate Limiting**
- **Password Hashing** with bcrypt

### Testing Infrastructure
- **Backend Unit Tests** for models, policies, and middleware
- **Feature Tests** for API endpoints
- **Frontend Component Tests** with React Testing Library
- **Integration Tests** for user flows
- **E2E Tests** with Cypress
- **API Testing** with Postman collection

### Documentation
- **Swagger/OpenAPI Documentation**
- **Postman Collection** with examples
- **Comprehensive README** with setup instructions
- **Code Documentation** with PHPDoc

## 🏗️ Architecture

### Backend (Laravel)
```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/          # API Controllers
│   │   │   └── Admin/        # Admin-specific Controllers
│   │   └── Middleware/       # Custom Middleware
│   ├── Models/               # Eloquent Models
│   ├── Policies/             # Authorization Policies
│   └── Exports/              # Data Export Classes
├── database/
│   ├── migrations/           # Database Migrations
│   └── seeders/              # Database Seeders
├── tests/
│   ├── Unit/                 # Unit Tests
│   └── Feature/              # Feature Tests
└── routes/
    └── api.php               # API Routes
```

### Frontend (React + TypeScript)
```
frontend/
├── src/
│   ├── components/           # Reusable Components
│   ├── pages/               # Page Components
│   ├── contexts/            # React Contexts
│   ├── services/            # API Services
│   ├── test/                # Test Files
│   │   ├── components/      # Component Tests
│   │   ├── integration/     # Integration Tests
│   │   └── mocks/           # Mock Data
│   └── types/               # TypeScript Types
├── cypress/                 # E2E Tests
└── public/                  # Static Assets
```

## 🛠️ Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js 18 or higher
- MySQL 8.0 or higher
- Git

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd role-management-system
   ```

2. **Run the setup script**
   ```bash
   # On Linux/Mac
   chmod +x backend/scripts/setup.sh
   ./backend/scripts/setup.sh
   
   # On Windows
   # Run the setup script manually or use WSL
   ```

3. **Manual Setup** (if script fails)

   **Backend Setup:**
   ```bash
   cd backend
   composer install
   cp env.example .env
   # Update .env with your database credentials
   php artisan key:generate
   php artisan migrate
   php artisan db:seed --class=RoleInitializationSeeder
   php artisan storage:link
   ```

   **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

### Environment Configuration

Update the `.env` file with your configuration:

```env
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=role_management
DB_USERNAME=your_username
DB_PASSWORD=your_password

# CORS (for frontend)
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1,localhost:3000
```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   php artisan serve
   ```
   Backend will be available at `http://localhost:8000`

2. **Start the frontend server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

### Production Mode

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Configure web server** (Apache/Nginx) to serve the application

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
php artisan test

# Run specific test suites
php artisan test --testsuite=Unit
php artisan test --testsuite=Feature

# Run with coverage
php artisan test --coverage
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### API Testing

1. **Import Postman Collection**
   - Import `backend/postman/Role_Management_API.postman_collection.json`
   - Set up environment variables

2. **Test with cURL**
   ```bash
   # Login
   curl -X POST http://localhost:8000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"Admin123!"}'
   
   # Get users (with token)
   curl -X GET http://localhost:8000/api/admin/users \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

## 📚 API Documentation

### Swagger Documentation
- **URL**: `http://localhost:8000/api/documentation`
- **Interactive API Explorer** with request/response examples
- **Authentication testing** built-in

### Postman Collection
- **File**: `backend/postman/Role_Management_API.postman_collection.json`
- **Pre-configured requests** for all endpoints
- **Environment variables** for easy testing

## 🔐 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@example.com | SuperAdmin123! |
| Admin | admin@example.com | Admin123! |
| Project Manager | pm@example.com | PM123! |
| Team Member | team@example.com | Team123! |
| Client | client@example.com | Client123! |

## 🏛️ Role Permissions

### Admin
- ✅ Full system access
- ✅ User management (CRUD)
- ✅ Project management (CRUD)
- ✅ Task management (CRUD)
- ✅ All data access

### Project Manager (PM)
- ✅ View all projects
- ✅ Manage assigned projects
- ✅ Create and assign tasks
- ❌ User management
- ❌ System administration

### Team Member
- ✅ View assigned projects
- ✅ Update assigned tasks
- ✅ View own profile
- ❌ User management
- ❌ Project creation

### Client
- ✅ View own projects
- ✅ View project tasks
- ✅ View own profile
- ❌ User management
- ❌ Task management

## 🔧 Configuration

### Database Seeding

```bash
# Seed with test data
php artisan db:seed --class=RoleTestSeeder

# Seed with project data
php artisan db:seed --class=ProjectTestSeeder

# Seed with all data
php artisan db:seed
```

### Customization

1. **Add new roles**: Update the `role` enum in migrations
2. **Modify permissions**: Update the respective Policy classes
3. **Add new features**: Follow the existing patterns for controllers and tests

## 🚀 Deployment

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM php:8.1-fpm
# ... (see docker/ directory for full configuration)

# Frontend Dockerfile
FROM node:18-alpine
# ... (see docker/ directory for full configuration)
```

### Environment Variables for Production

```env
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=mysql
DB_HOST=your_production_host
# ... (see env.example for full list)
```

## 📊 Monitoring and Logging

- **Application logs**: `storage/logs/laravel.log`
- **Error tracking**: Configure with Sentry or similar
- **Performance monitoring**: Use Laravel Telescope (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PSR-12 coding standards
- Write tests for new features
- Update documentation
- Ensure all tests pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and API docs
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Complete RBAC system
- Comprehensive testing suite
- API documentation
- Docker support

---

**Built with ❤️ using Laravel and React**
