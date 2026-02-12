# Rama Coffee Web Application

This project is separated into two main directories: `frontend` and `backend`.

## Project Structure

- **`backend/`**: Contains the C# Clean Architecture backend.
  - `RamaCoffee.API`: The ASP.NET Core Web API.
  - `RamaCoffee.Application`: Core business logic and interfaces.
  - `RamaCoffee.Domain`: Enterprise entities and domain logic.
  - `RamaCoffee.Infrastructure`: Data persistence and external services.
- **`frontend/`**: Contains the Next.js web application.

## Getting Started

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Build the solution:
   ```bash
   dotnet build RamaCoffee.sln
   ```
3. Run the API:
   ```bash
   dotnet run --project RamaCoffee.API
   ```

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) for the frontend and check the backend Swagger UI at the configured port (usually [http://localhost:<port>/swagger](http://localhost:<port>/swagger)).
