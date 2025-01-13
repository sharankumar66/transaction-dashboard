# MERN Stack Product Transactions Application

This project demonstrates a MERN stack application that interacts with a third-party API to fetch product transaction data. The application provides APIs for listing transactions, generating statistics, and visualizing data using bar and pie charts. A React frontend is built to consume these APIs and present the data interactively.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Frontend Features](#frontend-features)
- [Swagger Documentation](#swagger-documentation)
---

## Features
### Backend
- Fetch and seed transaction data into a database from a third-party API.
- API to list transactions with search and pagination.
- API for transaction statistics (total sales, sold items, unsold items).
- API to generate data for bar charts based on price ranges.
- API for pie charts to display item categories.
- API to combine data from multiple endpoints into a single response.

### Frontend
- Interactive table for transactions with:
  - Search and pagination.
  - Month selection dropdown.
  - Default selection for March.
- Visualization:
  - Bar chart for price ranges.
  - Pie chart for category distribution.
- Responsive design for desktop and mobile.

---

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React.js, Chart.js, Axios, Bootstrap
- **Other Tools**: Postman (API testing), GitHub

---

## Setup Instructions

### Prerequisites
- Node.js (>=16.x)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-product-transactions.git
   cd mern-product-transactions/backend

### Install dependencies
### `npm install`
### `PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>.mongodb.net/<database>?retryWrites=true&w=majority
Add Your MongoCli Details here in .env file
MONGO_URI=mongodb://localhost:27017/transactions
THIRD_PARTY_API_URL=https://s3.amazonaws.com/roxiler.com/product_transaction.json
`
### Start the server
`npm start`
or
`node index.js`

### Frontend
Go to frontend directory
`cd .\frontend\`
### Install dependencies
### `npm install`
### Start the React application:
### `npm start`
## Access the Application
Backend APIs: http://localhost:5000/api
Frontend: http://localhost:3000

## Frontend Features
- Table: Displays transactions with pagination, search, and month selection.
- Statistics Box: Shows total sales, sold items, and unsold items for the selected month.
- Charts:
   - Bar chart for price ranges.
   - Pie chart for categories.

## Swagger Documentation
You can view and interact with the backend API documentation at http://localhost:5000/api-docs/.


