import app from "./app";
import db from "./models";
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  console.log("Create table");
});
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
