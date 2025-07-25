/*
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
dotenv.config();

const process = require("process"); // Import process module

// const getLogFilename = () => {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `access-${year}-${month}-${day}.log`; // Example: access-2024-11-14.log
// };
// const customFormat =
//   ':remote-addr - :remote-user [:date[clf]] ":method :url" :status :res[content-length] ":referrer" ":user-agent"';

// var accessLogStream = rfs.createStream(getLogFilename, {
//   interval: "1d", // Rotate daily
//   path: path.join(__dirname, "log"),
//   initialRotation: true, // Force immediate rotation on startup
// });
// const morgan = require("morgan");

const pool = require("./dataBase/db.js");
const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 8080;

const corsOptions = {
  // origin: "https://consulttrain-465705.el.r.appspot.com", // or specify allowed origins like 'http://localhost:4200'
  origin: "*", // or specify allowed origins like 'http://localhost:4200'
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // specify the headers you're using
  credentials: true, // if you need to include cookies or authorization headers
  maxAge: 600, // Cache preflight response for 10 minutes
};

app.use(cors(corsOptions));
//app.options("*", cors());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
// Apply to all requests or specific routes
app.use(apiLimiter);
app.use(bodyParser.json());
app.use(express.json());

app.get("/rana/*", (req, res) => {
  res.json("tested rana");
});

// if (process.env.NODE_ENV === "production") {
// dotenv.config({ path: ".env.production" });
// app.use(morgan("combined", { stream: accessLogStream }));
// } else if (process.env.NODE_ENV === "test") {
//   dotenv.config({ path: ".env.test" });
//   app.use(morgan("combined", { stream: accessLogStream }));
// } else {
// app.use(morgan(customFormat, { stream: accessLogStream }));
//   // app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));
// }

// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     crossOriginOpenerPolicy: "same-origin-allow-popups",
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "'unsafe-eval'",
//           "https://www.google.com",
//           "https://www.gstatic.com",
//           `http://${process.env.URL}:${port}/`,
//         ], // Allow inline scripts
//         scriptSrcAttr: ["'unsafe-inline'"],
//         connectSrc: [
//           "'self'",
//           `https://${process.env.URL}:${port}/`,
//           `http://${process.env.URL}:${port}/`,
//         ], // Allow API connection
//         imgSrc: ["'self'", "data:"],
//         styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles
//         // fontSrc: ["'self'", "https://fonts.googleapis.com"],
//         objectSrc: ["'none'"],
//         frameSrc: ["'self'", "https://www.google.com"],
//         upgradeInsecureRequests: [],
//       },
//     },
//   })
// );

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/category", require("./routes/categoryRoutes.js"));
app.use("/api/course", require("./routes/courseRoutes.js"));
app.use("/api/bloodgroup", require("./routes/bgRoutes.js"));
app.use("/api/trainer", require("./routes/trainerRoutes.js"));
app.use("/api/dltype", require("./routes/licensetypeRoutes.js"));
app.use("/api/sponsor", require("./routes/sponsorRoutes.js"));
app.use("/api/location", require("./routes/locationRoutes.js"));
app.use("/api/result", require("./routes/resultRoutes.js"));
app.use("/api/stage", require("./routes/stageRoutes.js"));
app.use("/api/title", require("./routes/titleRoutes.js"));
app.use("/api/training", require("./routes/trainingRoutes.js"));
app.use("/api/vehicle", require("./routes/vehicleRoutes.js"));
app.use("/api/visual", require("./routes/visualRoutes.js"));
app.use("/api/driver", require("./routes/driverRoutes.js"));
app.use("/api/activity", require("./routes/activityRoutes.js"));
app.use("/api/assessment", require("./routes/assessmentRoutes.js"));

// const angularDistPath = path.join(__dirname, "consult-train", "browser");
// app.use(express.static(angularDistPath));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(angularDistPath, "index.html"));
// });

app.use(errorHandler);

pool
  .getConnection()
  .then((connection) => {
    console.log("Database connection pool created and tested successfully!");
    connection.release(); // Release the connection back to the pool
  })
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
      );
    });
  })
  .catch((error) => {
    console.error("Failed to establish initial database connection:", error);
    // You might want to exit the process if DB connection is critical for app startup
    // process.exit(1);
  });
*/
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.set("trust proxy", 1);

const allowedOrigins = [
  "https://api.consult-train.com.pk",
  "https://consult-train.com.pk",
  "https://app.consult-train.com.pk",
  "http://localhost:8080",
  "http://localhost:4200",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (non-browser requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 600,
};

function conditionalHelmet(req, res, next) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    return helmet()(req, res, next);
  }
  next(); // Skip helmet for other origins
}

app.use(cors(corsOptions));
app.use(conditionalHelmet);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
// Apply to all requests or specific routes
app.use(apiLimiter);
app.use(bodyParser.json());
app.use(express.json());

app.get("/rana", (req, res) => {
  console.log(`hit rana`);
  res.send("Hello Rana, your API is working on /rana!");
});

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/category", require("./routes/categoryRoutes.js"));
app.use("/api/course", require("./routes/courseRoutes.js"));
app.use("/api/bloodgroup", require("./routes/bgRoutes.js"));
app.use("/api/trainer", require("./routes/trainerRoutes.js"));
app.use("/api/dltype", require("./routes/licensetypeRoutes.js"));
app.use("/api/sponsor", require("./routes/sponsorRoutes.js"));
app.use("/api/location", require("./routes/locationRoutes.js"));
app.use("/api/result", require("./routes/resultRoutes.js"));
app.use("/api/stage", require("./routes/stageRoutes.js"));
app.use("/api/title", require("./routes/titleRoutes.js"));
app.use("/api/training", require("./routes/trainingRoutes.js"));
app.use("/api/vehicle", require("./routes/vehicleRoutes.js"));
app.use("/api/visual", require("./routes/visualRoutes.js"));
app.use("/api/driver", require("./routes/driverRoutes.js"));
app.use("/api/activity", require("./routes/activityRoutes.js"));
app.use("/api/assessment", require("./routes/assessmentRoutes.js"));

app.use(errorHandler);
const port = process.env.PORT || 8080;
const pool = require("./dataBase/db.js");

pool
  .getConnection()
  .then(() => {
    console.log("Database connection successful.");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
