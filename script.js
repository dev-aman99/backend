require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const orderRouter = require("./router/order-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

var corsOptions = {
  origin: "http://loacahost:3000",
  method: "GET,POST,PUT,DELETE,PATCH,HEAD",
  Credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
app.use("/api/orders", orderRouter);
app.use(errorMiddleware);

// for server running
const Port = 5000;
connectDb().then(() => {
  app.listen(Port, () => {
    console.log(`App is running on port : http://localhost:${Port}`);
  });
});
