import express, { Application } from "express";
import { createServer } from "http";
import "dotenv/config";
import "./infra/socket/index";
import cors from "cors";
import "./config/mongo.config";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router";
import propertyRoute from "./routes/property.route";
import serverInstance from "./infra/socket/index";
import chatRouter from "./routes/chatandMessage";
import propertyModel from "./models/property.model";
import bookingRouter from "./routes/booking.route";
const app: Application = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/property", propertyRoute);
app.use("/api/chat", chatRouter);
app.use(`/api/booking`, bookingRouter);

const server = createServer(app);

serverInstance(server);

server.listen(4000, async () => {
  console.log("Server running on port 4000");
});

export default app;
