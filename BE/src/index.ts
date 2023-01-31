import express from "express";
import indexRouter from "./routes";
import client from "./database";
const app = express();

client.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRouter);

app.listen(3000, () => {
  console.log("listen server port", 3000);
});
