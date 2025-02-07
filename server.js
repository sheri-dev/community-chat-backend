const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Change this to your frontend URL for security
    methods: ["GET", "POST"],
  },
});
const seceretKey = process.env.JWT_SECERET;
require("dotenv").config();
const DB_CONNECT = process.env.DB_URL;

// Handle Socket.io Connection for Calls
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Handle Call Offer
  socket.on("callUser", ({ to, signal, from, name }) => {
    io.to(to).emit("callIncoming", { signal, from, name });
  });

  // Handle Call Answer
  socket.on("answerCall", ({ signal, to }) => {
    io.to(to).emit("callAccepted", signal);
  });

  //  Handle Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());

// Import routes

const mediaRouter = require("./Routes/MediaRoute");
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/ChatRoute");
const messageRouter = require("./routes/MessageRoute");
const authRouter = require("./routes/AuthRoute");
const reportRouter = require("./Routes/reportRoute");
const callRouter = require("./Routes/CallRoute");

// Import routes
app.use("/api/V1/media", mediaRouter);
app.use("/api/V1/chats", chatRouter);
app.use("/api/V1", messageRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/V1", reportRouter);
app.use("/api/V1", callRouter);

// Connect to MongoDB

const connectDB = () => {
  mongoose
    .connect(DB_CONNECT)
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch(() => {
      console.log("Connection failed...");
    });
};

connectDB();
