require("dotenv").config();
import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

import twilio from "./src/Twilio";

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  socket.emit("hello", "1", "2");

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.json({
    success: true,
    queryString: req.query,
  });
});
app.get("/login", async (req, res, next) => {
  let data = await twilio.sendVerifyAsync(process.env.MY_PHONE_NUMBER, "sms");
  res.json({
    data,
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
