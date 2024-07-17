const mongoose = require("mongoose");
const env = require("dotenv");
const express = require("express");
const app = express();
// const authRoute = require("./routes/authRoute");
const cors = require('cors')

const authRouter = require("./controllers/auth");

env.config();

// 1) Middlewares
app.use(cors());
app.use(express.json())


// 2) Routes 

// app.use("/api/auth", authRoute); 
app.use("/api/auth", authRouter); 

// 3) MONGODB Connection

mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));

// 4) Global error Handler
app.use((err,  req, res, next) => {

  err.statusCode = err.statusCode || 500;
  err.stats = err.status;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

  // // Set CORS headers
  // res.header("Access-Control-Allow-Origin", "http://localhost:19006/"); // Replace with your frontend domain
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)

  // // Pass to next layer of middleware
  // next();
});

// 5) Server
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});