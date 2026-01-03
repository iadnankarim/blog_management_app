# Blog Management Application

A full stack blog application where users can register, login, and manage their blog posts. Built with Next.js for the frontend and Node.js/Express for the backend.

## Project Overview

This project has two main parts:
- `backend/` - REST API built with Node.js and Express
- `blog_management_app/` - Frontend built with Next.js and React

---

## Setup Instructions

### Prerequisites

Before you start, make sure you have these installed on your machine:
- Node.js (v16 or higher)
- MongoDB (you can use local MongoDB or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install all the dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend folder. You can copy from `.env.example`:
```bash
cp .env.example .env
```

4. Update your `.env` file with the following values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog_management
JWT_SECRET=your_secret_key_here_change_this
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

**Note:** Make sure to change the JWT_SECRET to something secure. The MONGODB_URI should point to your MongoDB instance.

5. Start the backend server:
```bash
npm run dev
```

If everything is working, you should see:
- "Connected to MongoDB"
- "Server running on port 5000"

### Frontend Setup

1. Open a new terminal and go to the frontend folder:
```bash
cd blog_management_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Running the Full Application

You need both servers running at the same time. Open two separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd blog_management_app
npm run dev
```

Now you can access the application at http://localhost:3000

---------------------------------------------

## Tech Stack

### Frontend Technologies

**Next.js 15**
- React framework that I used for building the UI
- Provides server-side rendering and routing

**TypeScript**
- Added type safety to catch errors during development
- Makes the code more maintainable

**Redux Toolkit with RTK Query**
- For managing application state
- RTK Query handles all the API calls and caching

**TailwindCSS**
- Used for styling the components
- Makes it easy to build responsive designs

**TipTap Editor**
- Rich text editor for writing blog posts
- Users can format their content with bold, italic, lists, etc.

**React Hook Form + Zod**
- Form handling and validation
- Zod schemas validate user input before sending to backend

### Backend Technologies

**Node.js with Express**
- Built the REST API using Express framework
- Handles all HTTP requests and responses

**TypeScript**
- Used TypeScript on backend as well for type safety
- Helps prevent runtime errors

**MongoDB with Mongoose**
- MongoDB as the database to store users and posts
- Mongoose for creating schemas and interacting with database

**JWT (JSON Web Tokens)**
- Used for user authentication
- Tokens are generated on login and sent with each request

**bcryptjs**
- For hashing passwords before storing in database
- Passwords are never stored in plain text

**express-validator**
- Validates incoming requests
- Ensures data is in correct format before processing

**CORS**
- Configured to allow frontend to communicate with backend
- Set to accept requests from localhost:3000

---------------------------------------------

## API Documentation

All endpoints are prefixed with: `http://localhost:5000/api`

### Authentication Routes

**1. User Registration**

Creates a new user account.

```
POST /api/auth/register
```

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Success Response (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

Possible Errors:
- 400: Email already exists
- 400: Validation failed (missing fields)

---

**2. User Login**

Authenticate existing user.

```
POST /api/auth/login
```

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Success Response (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

Possible Errors:
- 401: Invalid email or password
- 400: Missing credentials

---

**3. Get Current User**

Get the logged-in user's information.

```
GET /api/auth/me
```

Headers Required:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Success Response (200):
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

Possible Errors:
- 401: Not authenticated (missing or invalid token)

---

**4. Logout**

Log out the current user.

```
POST /api/auth/logout
```

Headers Required:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Success Response (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Blog Posts Routes

**1. Get All Posts**

Fetch all blog posts. This is a public route, no authentication needed.

```
GET /api/posts
```

Optional Query Parameters:
- `search` - Search posts by title or content
- `category` - Filter posts by category

Examples:
```
GET /api/posts
GET /api/posts?search=javascript
GET /api/posts?category=technology
GET /api/posts?search=react&category=programming
```

Success Response (200):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with React",
      "content": "React is a JavaScript library...",
      "category": "programming",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

**2. Get Single Post**

Get one specific post by its ID. Public route.

```
GET /api/posts/:id
```

Example:
```
GET /api/posts/507f1f77bcf86cd799439011
```

Success Response (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with React",
    "content": "Full post content here...",
    "category": "programming",
    "author": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

Possible Errors:
- 404: Post not found

---

**3. Create New Post**

Create a new blog post. Requires authentication.

```
POST /api/posts
```

Headers Required:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

Request body:
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my post...",
  "category": "technology"
}
```

Success Response (201):
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My First Blog Post",
    "content": "This is the content of my post...",
    "category": "technology",
    "author": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

Possible Errors:
- 401: Not authenticated
- 400: Validation error (title or content too short)

---

**4. Update Post**

Update an existing post. Only the post owner can update.

```
PUT /api/posts/:id
```

Headers Required:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

Request body (all fields optional):
```json
{
  "title": "Updated Title",
  "content": "Updated content here...",
  "category": "updated-category"
}
```

Success Response (200):
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Title",
    "content": "Updated content here...",
    "category": "updated-category",
    "author": {...},
    "updatedAt": "2024-01-15T13:00:00.000Z"
  }
}
```

Possible Errors:
- 401: Not authenticated
- 403: Not authorized (you can only edit your own posts)
- 404: Post not found

---

**5. Delete Post**

Delete a post. Only the post owner can delete.

```
DELETE /api/posts/:id
```

Headers Required:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Success Response (200):
```json
{
  "success": true,
  "message": "Post deleted successfully",
  "data": {}
}
```

Possible Errors:
- 401: Not authenticated
- 403: Not authorized (you can only delete your own posts)
- 404: Post not found

---

### Response Status Codes

Here's what the status codes mean:
- **200** - Request successful
- **201** - Resource created successfully
- **400** - Bad request (validation error or missing fields)
- **401** - Not authenticated (missing or invalid token)
- **403** - Forbidden (you don't have permission)
- **404** - Resource not found
- **500** - Server error

---------------------------------------------

## Brief Architecture Explanation

### How the Application Works

The application follows a standard client-server architecture:

```
User Browser (React/Next.js)
        ↓
    Frontend (localhost:3000)
        ↓
    API Calls (HTTP Requests)
        ↓
    Backend Server (localhost:5000)
        ↓
    MongoDB Database
```

### Frontend Architecture

The frontend is built with Next.js and uses the App Router. Here's how it's organized:

- **Components** - Reusable UI components like buttons, forms, cards
- **Pages** - Different routes like home, login, register, create post
- **Redux Store** - Manages global state (user info, auth token, posts list)
- **RTK Query** - Handles all API calls and caches responses

When a user performs an action (like creating a post), here's what happens:
1. User fills out the form and clicks submit
2. Form is validated using Zod schema
3. If valid, Redux action is dispatched
4. RTK Query sends HTTP request to backend with JWT token
5. Backend processes request and sends response
6. Redux updates the state with new data
7. UI automatically re-renders with updated data

### Backend Architecture

The backend follows the MVC (Model-View-Controller) pattern:

**Models** (`models/`)
- Define the structure of data in MongoDB
- User model: name, email, password
- Post model: title, content, category, author reference

**Controllers** (`controllers/`)
- Contain the business logic
- authController: handles registration, login, logout
- postController: handles CRUD operations for posts

**Routes** (`routes/`)
- Define the API endpoints
- Map URLs to controller functions
- Example: `POST /api/auth/register` → authController.register

**Middleware** (`middleware/`)
- Functions that run before controllers
- authMiddleware: verifies JWT token and authenticates user
- Checks if user is logged in before allowing access to protected routes

### Request Flow Example

Let's say a user wants to create a new blog post:

1. User writes post content in TipTap editor and clicks "Publish"
2. Frontend validates the form data (title min 3 chars, content min 10 chars)
3. Redux dispatches `createPost` action with the data
4. RTK Query sends POST request to `/api/posts` with JWT token in header
5. Backend middleware checks if token is valid
6. If valid, request goes to postController.createPost
7. Controller validates data again using express-validator
8. New post is saved to MongoDB with author ID
9. Backend sends response with created post data
10. Frontend Redux state updates with new post
11. UI shows success message and displays the new post

### Authentication Flow

**Registration:**
1. User submits name, email, password
2. Backend checks if email already exists
3. Password is hashed using bcrypt (10 rounds)
4. User is saved to database
5. JWT token is generated and sent back
6. Frontend stores token in Redux state

**Login:**
1. User submits email and password
2. Backend finds user by email
3. Password is compared with hashed password using bcrypt
4. If match, JWT token is generated
5. Token sent to frontend and stored in Redux

**Protected Routes:**
1. Frontend sends token in Authorization header with every request
2. Backend middleware extracts and verifies token
3. If valid, user ID is extracted from token
4. Request proceeds to controller with user information
5. Controller can access current user via req.user

### Database Schema

**Users Collection:**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

**Posts Collection:**
```javascript
{
  _id: ObjectId,
  title: String (required, min 3 chars),
  content: String (required, min 10 chars),
  category: String (optional),
  author: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

The author field in Posts references the User collection, creating a relationship between posts and their authors.

### Key Security Features

1. **Password Security** - Passwords are hashed with bcrypt before storing
2. **JWT Authentication** - Stateless token-based auth, tokens expire after 7 days
3. **Authorization** - Users can only edit/delete their own posts
4. **Input Validation** - All inputs validated on both frontend and backend
5. **CORS** - Only allows requests from trusted origins
6. **Protected Routes** - Sensitive operations require valid JWT token

---------------------------------------------

## Postman Collection / cURL Commands

Here are some example commands to test the API. You can use these in terminal or import into Postman.

### Step 1: Register a User

```bash
http://localhost:5000/api/auth/register

 "Content-Type: application/json"
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```


### Step 2: Login

```bash
http://localhost:5000/api/auth/login

 "Content-Type: application/json"
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Step 3: Get Current User Info

Replace `YOUR_TOKEN` with the actual token you got from login.

```bash
 GET http://localhost:5000/api/auth/me
  "Authorization: Bearer YOUR_TOKEN"
```

### Step 4: Create a Blog Post

```bash
 http://localhost:5000/api/posts
 "Content-Type: application/json"

  "Authorization: Bearer YOUR_TOKEN"
 {
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "excerpt": "A short description of the post"
}
```


### Step 5: Get All Posts

This doesn't require authentication.

```bash
http://localhost:5000/api/posts
```

### Step 6: Get Single Post

Replace `POST_ID` with actual ID.

```bash
GET http://localhost:5000/api/posts/POST_ID
```

### Step 7: Update a Post

Replace `POST_ID` with your post ID and `YOUR_TOKEN` with your token.

```bash
 PUT http://localhost:5000/api/posts/POST_ID
 PUT http://localhost:5000/api/posts/69576a10247b1d45c7806276
  "Content-Type: application/json"
  "Authorization: Bearer YOUR_TOKEN"
  -d '{
    "title": "Updated Post Title",
    "content": "This is my updated content."
  }'
```

### Step 8: Delete a Post

```bash
DELETE http://localhost:5000/api/posts/69576a10247b1d45c7806276
 DELETE http://localhost:5000/api/posts/POST_ID
  "Authorization: Bearer YOUR_TOKEN"
```

### Step 9: Search Posts

```bash
 GET "http://localhost:5000/api/posts?search=javascript"
```

### Step 10: Filter Posts by Category

```bash
 GET "http://localhost:5000/api/posts?category=technology"
```

### Using Postman

If you prefer using Postman:

1. Create a new collection called "Blog Management API"
2. Add an environment variable called `token` and `baseUrl`
3. Set `baseUrl` to `http://localhost:5000/api`
4. For each endpoint, create a new request
5. Use `{{baseUrl}}/auth/register` format for URLs
6. For protected routes, add header: `Authorization: Bearer {{token}}`
7. After login, manually copy token to the environment variable

This makes it easy to test all endpoints without changing tokens everywhere.

---------------------------------------------
