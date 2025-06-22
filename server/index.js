const express = require("express");
const app = express();

const mongoose = require("mongoose");
// const cors = require("cors");
const cookieParser = require("cookie-parser");

const { PORT, MONGODB_URI } = require("./config/var");
const router = require("./api/routers/index");

app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

const db = mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error while connecting DB");
  });

app.use("/api", router);

app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || PORT, () => {
  console.log(
    `Server running on port ${process.env.X_ZOHO_CATALYST_LISTEN_PORT || PORT}`
  );
});
