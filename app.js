const express = require("express");
const hostRouter = require("./routes/hostRouter");
const { default: mongoose } = require("mongoose");
const storeRouter = require("./routes/storeRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

app.use(storeRouter);
app.use(hostRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

const PORT = 4201;

const DB_PATH =
  "mongodb+srv://atishkamble398_db_user:D4VsMY5G8fvRxGKn@clustergoflatlisting.bqnrsws.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGoFlatListing";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("MongoDB Connected Successfully...");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error to connect Mongo", error);
  });
