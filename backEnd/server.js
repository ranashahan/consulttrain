const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "access.log"),
//   { flags: "a" }
// );

// Function to generate the filename based on the date
// const getLogFilename = (time, index) => {
//   if (!time) return "access.log"; // Default file name
//   const date = new Date(time);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `access-${year}-${month}-${day}.log`; // Example: access-2024-11-14.log
// };

const getLogFilename = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `access-${year}-${month}-${day}.log`; // Example: access-2024-11-14.log
};
const customFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url" :status :res[content-length] ":referrer" ":user-agent"';

var accessLogStream = rfs.createStream(getLogFilename, {
  interval: "1d", // Rotate daily
  path: path.join(__dirname, "log"),
  initialRotation: true, // Force immediate rotation on startup
});
const morgan = require("morgan");

const pool = require("./dataBase/db.js");
const app = express();

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "*", // or specify allowed origins like 'http://localhost:4200'
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // specify the headers you're using
  credentials: true, // if you need to include cookies or authorization headers
  maxAge: 600, // Cache preflight response for 10 minutes
};

app.use(cors(corsOptions));
//app.options("*", cors());
app.use(bodyParser.json());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
  app.use(morgan("combined", { stream: accessLogStream }));
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
  app.use(morgan("combined", { stream: accessLogStream }));
} else {
  app.use(morgan(customFormat, { stream: accessLogStream }));
  // app.use(
  //   morgan(":method :url :status :response-time ms - :res[content-length]")
  // );
}

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts
//         connectSrc: ["'self'", "http://192.168.0.143:5001/*"], // Allow API connection
//         imgSrc: ["'self'", "data:"],
//         styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles
//       },
//     },
//   })
// );

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bloodgroup", require("./routes/bgRoutes.js"));
app.use("/api/trainer", require("./routes/trainerRoutes.js"));
app.use("/api/dltype", require("./routes/licensetypeRoutes.js"));
app.use("/api/contractor", require("./routes/contractorRoutes.js"));
app.use("/api/location", require("./routes/locationRoutes.js"));
app.use("/api/result", require("./routes/resultRoutes.js"));
app.use("/api/stage", require("./routes/stageRoutes.js"));
app.use("/api/title", require("./routes/titleRoutes.js"));
app.use("/api/training", require("./routes/trainingRoutes.js"));
app.use("/api/vehicle", require("./routes/vehicleRoutes.js"));
app.use("/api/visual", require("./routes/visualRoutes.js"));
app.use("/api/driver", require("./routes/driverRoutes.js"));
app.use("/api/client", require("./routes/clientRoutes.js"));
app.use("/api/activity", require("./routes/activityRoutes.js"));
app.use("/api/assessment", require("./routes/assessmentRoutes.js"));
// Serve the Angular app's static files from the dist folder
app.use(express.static(path.join(__dirname, "consult-train/browser")));

// Route all other requests to the Angular app's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "consult-train/browser/index.html"));
});
app.use(errorHandler);

pool
  .getConnection()
  .then(() => {
    app.listen(port, () => {
      console.log("connection successfully created");
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
      );
    });
  })
  .catch((err) => {
    console.log("error occurred with database connection: " + err);
    process.exit(0);
  });
