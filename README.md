# Presentation Platform

This project is a Presentation Platform that allows users to create, edit, and delete presentations. The platform consists of two main parts:

1. **Backend**: Handles the server-side operations, such as CRUD operations for presentations and slides, and communicates with the database.
2. **Frontend**: Provides the user interface for interacting with the platform, including creating and editing presentations and slides.

## Project Structure

The project is separated into two main directories: `frontend` and `backend`.

### Backend

- **Directory**: `backend`
- **Description**: The backend is built with Node.js and Express.js. It provides RESTful APIs for managing presentations and slides. It uses MongoDB as the database.
- **Main Files**:
  - `server.js`: Entry point of the backend application.
  - `controllers/`: Contains the logic for handling API requests.
  - `routes/`: Defines the API routes for presentations and slides.
  - `models/`: Contains the Mongoose models for presentations and slides.

#### Setup Instructions

1. **Install Dependencies**: 
   ```
   cd backend
   npm install
   ```
2. **Environment Variables**: Create a `.env` file in the `backend` directory with the following variables:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   PORT=3001
   ```
3. **Run the Server**: 
   ```
   npm start
   ```

### Frontend

- **Directory**: `frontend`
- **Description**: The frontend is built with React and TypeScript. It provides a user-friendly interface for interacting with the presentations and slides.
- **Main Files**:
  - `src/`: Contains all the React components, pages, and styles.
  - `public/`: Static files and the HTML template.
  - `App.tsx`: Main component that sets up the routes and structure of the application.
  - `index.tsx`: Entry point for the React application.

#### Setup Instructions

1. **Install Dependencies**:
   ```
   cd frontend
   npm install
   ```
2. **Run the Frontend**:
   ```
   npm start
   ```

## Running the Project

1. **Start the Backend**:
   - Navigate to the `backend` directory.
   - Run `npm start`.
   - The backend will start on `http://localhost:3001`.

2. **Start the Frontend**:
   - Navigate to the `frontend` directory.
   - Run `npm start`.
   - The frontend will start on `http://localhost:3000`.

## Features

- **Presentation Management**: Create, edit, delete, and view presentations.
- **Slide Management**: Add, edit, delete, and preview slides within a presentation.
- **Error Handling**: User-friendly error messages are displayed for common errors (e.g., creating a presentation with a duplicate title).

## Code Quality

The code follows best practices for both frontend and backend development. Some of the key conventions applied include:

- **Separation of Concerns**: Clear separation between different parts of the application (e.g., components, services, styles).
- **TypeScript**: Used in the frontend for type safety and better developer experience.
- **CSS Modules**: Organized CSS files with appropriate class names, avoiding global scope pollution.
- **Error Handling**: Comprehensive error handling across both backend and frontend.

## Improvements

- **Code Redundancy**: Reviewed and removed redundant code.
- **CSS Optimization**: Optimized CSS classes for better maintainability.
- **Debouncing**: Debounce techniques can be applied for search or input-related operations where necessary.

## Future Enhancements

- **Dockerization**: Containerize the backend, frontend, and database using Docker for a comprehensive development environment.
- **Unit Tests**: Implement unit tests for both backend and frontend to ensure code quality and reliability.

