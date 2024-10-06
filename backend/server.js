const express = require('express');
const connectDB = require('./config/db'); // Adjust the path according to your project structure
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const cors = require('cors'); // Import the cors package
const productRoutes = require('./routes/productRoutes'); // Import product routes



const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
// Enable CORS for all routes
const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
};

app.use(cors(corsOptions)); // Use the CORS middleware with options
// Use the CORS middleware with options
  
app.use(express.json()); // Parse incoming JSON requests

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
