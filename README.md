# Goalsetter - MERN Stack Application

> **⚠️ IMPORTANT FOR DATAANNOTATION REVIEWERS:** This application only works in development mode. The production build has known issues. 
> 
> **Quick Setup (for scrubbed projects):**
> 1. `npm install` (install root dependencies)
> 2. `cd frontend`
> 3. `npm install` (install frontend dependencies)
> 4. `cd ..`
> 5. `npm run dev` (start both servers)
> 
> This will start both frontend and backend servers concurrently.

A full-stack goal management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to create, manage, and track their personal goals. **This version uses in-memory storage for demonstration purposes - data is reset when the server restarts.**

## 🚀 Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Goal Management**: Create, read, update, and delete personal goals
- **User Dashboard**: Clean and intuitive interface for managing goals
- **Real-time Updates**: Instant feedback with toast notifications
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Secure API**: Protected routes with authentication middleware
- **In-Memory Storage**: Clean slate every time the application restarts
- **Fast Queries**: Optimized with LokiJS indexing

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **LokiJS** - In-memory database with MongoDB-like queries
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **React Icons** - Icon library

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mern-tutorial-fork-main
```

### 2. Environment Configuration
Create a `.env` file in the root directory and add your JWT secret:
```env
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### 3. Install Dependencies

#### Backend Dependencies
```bash
npm install
```

#### Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 4. Running the Application

#### Development Mode (Both Frontend and Backend)
```bash
npm run dev
```
This will start both the backend server and frontend development server concurrently.

#### Backend Only
```bash
npm run server
```
Starts the backend server with nodemon for development.

#### Frontend Only
```bash
npm run client
```
Starts the React development server.

#### Production Mode
```bash
npm start
```
Starts the production server.

---

## 🌐 Accessing the App

Once the app is running, open the appropriate link in your browser:

- **Development Server** (auto-reloads, best for local development):
  [http://localhost:3000](http://localhost:3000)
- **Production Server** (after running `npm start`):
  [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

```
mern-tutorial-fork-main/
├── backend/
│   ├── dataStore.js           # In-memory database using LokiJS
│   ├── controllers/
│   │   ├── goalController.js  # Goal CRUD operations
│   │   └── userController.js  # User authentication
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT authentication
│   │   └── errorMiddleware.js # Error handling
│   ├── routes/
│   │   ├── goalRoutes.js      # Goal API routes
│   │   └── userRoutes.js      # User API routes
│   └── server.js              # Express server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js       # Redux store
│   │   ├── components/
│   │   │   ├── GoalForm.jsx   # Goal creation form
│   │   │   ├── GoalItem.jsx   # Individual goal display
│   │   │   ├── Header.jsx     # Navigation header
│   │   │   └── Spinner.jsx    # Loading component
│   │   ├── features/
│   │   │   ├── auth/          # Authentication Redux slice
│   │   │   └── goals/         # Goals Redux slice
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx  # Main dashboard
│   │   │   ├── Login.jsx      # Login page
│   │   │   └── Register.jsx   # Registration page
│   │   └── App.js             # Main React component
│   └── package.json
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user (protected)

### Goals
- `GET /api/goals` - Get all goals for current user (protected)
- `POST /api/goals` - Create a new goal (protected)
- `PUT /api/goals/:id` - Update a goal (protected)
- `DELETE /api/goals/:id` - Delete a goal (protected)

## 💾 Data Storage

This application uses **LokiJS** for in-memory storage instead of a persistent database. This means:

- ✅ **Fast Performance**: No database queries or network latency
- ✅ **Simple Setup**: No database installation or configuration required
- ✅ **Clean State**: Fresh start every time the server restarts
- ✅ **MongoDB-like Queries**: Familiar query syntax with `find()`, `findOne()`
- ✅ **Built-in Indexing**: Fast lookups on email and user fields
- ✅ **Unique Constraints**: Automatic email uniqueness enforcement
- ⚠️ **No Persistence**: All data is lost when the server stops
- ⚠️ **Single Instance**: Cannot scale to multiple server instances

Perfect for demonstrations, testing, and learning purposes!

## 🚀 Deployment

### Heroku Deployment
The application is configured for Heroku deployment with the following build script:
```bash
heroku-postbuild: NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend
```

### Environment Variables for Production
Make sure to set the following environment variables in your production environment:
- `JWT_SECRET` - Your JWT secret key
- `NODE_ENV` - Set to "production"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Brad Traversy**
- YouTube: [Traversy Media](https://www.youtube.com/c/TraversyMedia)
- Course: [Learn the MERN Stack](https://www.youtube.com/watch?v=-0exw-9YJBo)

## 🙏 Acknowledgments

- Built following the MERN Stack tutorial by Brad Traversy
- Modified to use LokiJS in-memory storage for demonstration purposes
- Icons provided by React Icons
- Toast notifications by React Toastify
