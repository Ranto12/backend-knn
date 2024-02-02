# Backend-KNN

Backend-KNN is a Node.js backend project for a Skripsi (thesis) project utilizing K-Nearest Neighbors (KNN) algorithm.

## Project Structure

The project structure includes the following components:

- `config/db.js`: Database configuration file.
- `controllers/Knn/index.js`: Controller for KNN operations.
- `controllers/User/index.js`: Controller for user-related operations.
- `index.js`: Main entry point of the application.
- `middleware/verifyToken.js`: Middleware for verifying JSON Web Tokens (JWT).
- `package.json` and `package-lock.json`: Node.js project configuration files.
- `route/index.js`: Routes configuration file.

## Scripts

- `npm start`: Start the application.
- `npm test`: Run tests (placeholder).
  
## Dependencies

- **bcrypt**: Password hashing library.
- **body-parser**: Middleware to parse incoming request bodies.
- **dotenv**: Load environment variables from a file.
- **exceljs**: Excel file processing library.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: JSON Web Token (JWT) library.
- **multer**: Middleware for handling multipart/form-data (file uploads).
- **mysql2**: MySQL database client.
- **nodemon**: Utility to monitor for changes and restart the server.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ranto12/backend-knn.git
