const express = require("express");
const app = express();
const taskRoutes = require("./routes/task");
const connectDB = require("./db/connect");
const notfound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
require("dotenv").config({ path: "./.env" });

//Middleware
app.use(express.json()); // in order to access the request body
app.use(express.static("./public")); // to serve static files

// set root route for Tasksl
app.use("/api/v1/tasks", taskRoutes);
app.use(notfound);
app.use(errorHandlerMiddleware);

//connect to db
const start = async () => {
  try {
    //make connection to db then start server
    console.log("%%%%%% " + process.env.MONGO_URI);
    await connectDB(process.env.MONGO_URI);
    const port = 3000;
    app.listen(port, console.log(`Server0 up and running on port ${port}....`));
  } catch (err) {
    console.log(err);
  }
};
start();
//app.listen(3000, console.log(`Server0 up and running on port 3000....`));
