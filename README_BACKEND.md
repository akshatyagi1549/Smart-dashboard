# Backend Setup Instructions

## Database Setup
1. Open MySQL Workbench
2. Create database: `CREATE DATABASE ngo_db;`
3. Update `.env` file with your MySQL password

## Environment Variables
Update `.env` file:
```
DB_PASSWORD=your_mysql_password
VITE_API_URL=http://localhost:5000
```

## Running the Application
```bash
# Run both frontend and backend
npm run dev:full

# Or run separately:
# Backend only
npm run backend

# Frontend only  
npm run dev
```

## API Endpoints
- POST `/api/donations` - Add new donation
- GET `/api/donations` - Get all donations

## Database Schema
```sql
CREATE TABLE donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  donation_type VARCHAR(50) NOT NULL,
  purpose VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```