const express = require("express");

const { connectDB } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/users");

const app = express();
const PORT = 3300;

connectDB("mongodb://127.0.0.1:27017/users-db")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error", err));

// middleware
app.use(express.urlencoded({ extended: true }));

app.use(logReqRes("log.txt"));

app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server is up and running on PORT ${PORT}`));
