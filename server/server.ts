import app from "./app";
import db from "./models";
const PORT = process.env.PORT || 3000;
const { rootRouter } = require("./router/index");
db.sequelize.sync().then(() => {
  console.log("Create table");
});
app.use("/api/v1", rootRouter);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
