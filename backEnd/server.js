const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const dotenv = require("dotenv").config();
const connectToDataBase = require("./dataBase/db.js");
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bloodgroup", require("./routes/bgRoutes.js"));
app.use("/api/trainer", require("./routes/trainerRoutes.js"));
app.use("/api/dltype", require("./routes/licensetypeRoutes.js"));
app.use("/api/contractor", require("./routes/contractorRoutes.js"));
app.use("/api/location", require("./routes/locationRoutes.js"));
app.use("/api/result", require("./routes/resultRoutes.js"));
app.use("/api/stage", require("./routes/stageRoutes.js"));
app.use("/api/title", require("./routes/titleRoutes.js"));
app.use("/api/vehicle", require("./routes/vehicleRoutes.js"));
app.use("/api/visual", require("./routes/visualRoutes.js"));
app.use("/api/driver", require("./routes/driverRoutes.js"));
app.use("/api/client", require("./routes/clientRoutes.js"));
app.use("/api/cc", require("./routes/ccRoutes.js"));
app.use("/api/activity", require("./routes/activityRoutes.js"));
app.use("/api/assessment", require("./routes/assessmentRoutes.js"));
// Serve the Angular app's static files from the dist folder
// app.use(express.static(path.join(__dirname, "consulttrain/browser")));

// Route all other requests to the Angular app's index.html
// app.get("*", (req, res) => {
// res.sendFile(path.join(__dirname, "consulttrain/browser/index.html"));
// });
app.use(errorHandler);

connectToDataBase
  .connectToDataBase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running against ${port}`);
    });
  })
  .catch((err) => {
    console.log("error occurred with database connection: " + err);
    process.exit(0);
  });
