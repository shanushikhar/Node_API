const express = require("express");
const dotenv = require("dotenv");
const morganMiddleware = require("morgan");
const connectDB = require("./config/db");

// Custom middleware
const logger = require("./middleware/logger");
// Route files
const routes = require("./routes/bootcamps");

// load env vars
dotenv.config({ path: "./config/config.env" });

//console.log(process.env.MONGO_URI)

// Connect to DB
connectDB();

const app = express();

// Body parser ( to get the request from user in json)
app.use(express.json());

// Morgan logger
if (process.env.NODE_ENV === "development") {
  app.use(morganMiddleware("dev"));
}

// Middleware
app.use(logger);

// Mount routes
app.use("/api/v1/bootcamps", routes);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejection

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // close server & exit process
  server.close(() => process.exit(1));
});
