require("dotenv").config();
const express = require("express");
const env = require("./util/validateEnv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const postRoutes = require("./routes/post.routes");
const createHttpError = require("http-errors");
const port = env.PORT;

// connexion à la DB
connectDB();

const app = express();

app.use(morgan("dev"));

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", postRoutes);

// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port  " + port));

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error, req, res, next) => {
  //   console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (createHttpError.isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});
