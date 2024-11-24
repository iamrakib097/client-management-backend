const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const userRoutes = require("./routes/userRoutes");
const currencySettingRoutes = require("./routes/currencySettingRoutes");
const clientSettingRoutes = require("./routes/clientSettingRoutes");
const projectSettingRoutes = require("./routes/projectSettingRoutes");
const clientRoutes = require("./routes/clientRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api", clientRoutes);
app.use("/api", projectRoutes);
app.use("/api", paymentRoutes);
app.use("/api", userRoutes);
app.use("/api", currencySettingRoutes);
app.use("/api", clientSettingRoutes);
app.use("/api", projectSettingRoutes);
app.use("/api", authRoutes);

connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 500}`);
});
