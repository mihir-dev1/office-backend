import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authMiddleware } from "./middlewares/auth";
import cors from 'cors';

const app = express();
app.use(cors());
// 🔐 Route to Auth Service
app.use("/auth", createProxyMiddleware({
  target: "http://localhost:4001",
  changeOrigin: true
}));

// 🏢 Route to Company Service
app.use("/company", authMiddleware, createProxyMiddleware({
  target: "http://localhost:4002",
  changeOrigin: true
}));

// 👨‍💼 Route to Employee Service
app.use("/employee", authMiddleware,createProxyMiddleware({
  target: "http://localhost:4003",
  changeOrigin: true
}));

app.listen(5000, () => {
  console.log("🚀 API Gateway running on port 5000");
});
