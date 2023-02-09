import express from "express";
import cors from "cors";
import indexRouter from "./routes";
import client from "./database";
const app = express();
const bodyParser = require("body-parser");
client.connect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", indexRouter);

app.listen(3000, () => {
  console.log("listen server port", 3000);
});
