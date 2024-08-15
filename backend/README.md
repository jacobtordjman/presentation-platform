# Presentation Platform API

This project is a server-side service designed for managing presentations on a web platform. It is built using Node.js, Express, and MongoDB, adhering to RESTful API conventions. The service provides functionalities for creating, retrieving, updating, and deleting presentations and slides.

## Features

- **Create Presentation**: Create a new presentation with a unique title, list of authors, and a timestamp of when it was published.
- **Fetch Presentation by ID**: Retrieve detailed information about a specific presentation, including all associated slides.
- **Get All Presentations**: List all presentations stored in the database.
- **Add Slide**: Append a new slide to an existing presentation.
- **Update Slide**: Modify the content of an existing slide.
- **Update Authors**: Modify the list of authors for a specific presentation.
- **Delete Slide**: Remove a specific slide from a presentation.
- **Delete Presentation**: Permanently delete a presentation and all associated slides.

## Project Structure

- `server.js`: The main entry point of the application. Configures Express, connects to MongoDB, and sets up API routes.
- `routes/slideRoutes.js`: Defines API endpoints for managing slides.
- `routes/presentationRoutes.js`: Defines API endpoints for managing presentations.
- `models/slide.js`: Defines the Mongoose schema and model for slides.
- `models/presentation.js`: Defines the Mongoose schema and model for presentations.
- `controllers/slideController.js`: Handles the business logic for slide operations.
- `controllers/presentationController.js`: Handles the business logic for presentation operations.
- `config/db.js`: Contains the MongoDB connection string.

## Setup Instructions

1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   ```
   
2. **Install Dependencies**: 
   ```bash
   cd <repository-folder>
   npm install
   ```

3. **Configure MongoDB**:
   - Ensure MongoDB is installed and running on your local machine.
   - The default MongoDB connection string is located in `config/db.js`.

4. **Run the Application**:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000`.

5. **API Endpoints**:
   - **Presentations**: `http://localhost:3000/api/presentations`
   - **Slides**: `http://localhost:3000/api/slides`

6. **Testing**:
   - Use tools like Postman or Swagger for manual API testing.
   - Optionally, implement unit and integration tests.

## Deployment

Ensure that your MongoDB database is configured properly on the deployment environment. Use environment variables to manage the database connection string in production.

## Version Control

- The project is version controlled using Git. Ensure all commits are pushed to a public GitHub repository.
