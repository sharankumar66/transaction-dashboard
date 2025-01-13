const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const transactionRoutes = require("./routes/transactionRoutes"); // Correct import
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dashboard API",
      version: "1.0.0",
      description: "API documentation for the Dashboard app",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`, // URL for accessing the API
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files with the Swagger comments
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI; // Use environment variable

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Use transaction routes
app.use("/api", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Routes
// app.post("/transactions", async (req, res) => {
//   try {
//     const { productId, productName, quantity, price } = req.body;
//     const totalPrice = quantity * price;

//     const transaction = new Transaction({
//       productId,
//       productName,
//       quantity,
//       price,
//       totalPrice,
//     });

//     await transaction.save();
//     res.status(201).json(transaction);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.get("/transactions", async (req, res) => {
//   try {
//     const transactions = await Transaction.find();
//     res.status(200).json(transactions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
