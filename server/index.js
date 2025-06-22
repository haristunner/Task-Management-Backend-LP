const express = require("express");
const { PORT } = require("./config/var");
const app = express();

const router = require("./api/routers/index");

app.use("/api", router);

app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || PORT, () => {
  console.log(
    `Server running on port ${process.env.X_ZOHO_CATALYST_LISTEN_PORT || PORT}`
  );
});
