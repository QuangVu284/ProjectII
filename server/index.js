const express = require("express");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRouter = require("./route/authRoute");
const watchRouter = require("./route/watchRoute");
const listRouter = require("./route/listRoute");
const bannerRoute = require("./route/bannerRoute");
const commentRouter = require("./route/commentRoute");
const searchRouter = require("./route/searchRoute");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");

dbConnect();
dotenv.config();
const server = http.createServer(app);
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const io = socketIo(server, { cors: corsOptions });
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Received message:", data);
    // Phát lại tin nhắn cho tất cả các client
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/comment", commentRouter);
app.use("/api/list", listRouter);
app.use("/api/banner", bannerRoute);
app.use("/api/watch", watchRouter);
app.use("/api/search", searchRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
