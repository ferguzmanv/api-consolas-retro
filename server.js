import express from "express";
import consolasRouter from "./routes/consolas.routes.js";
import connectDB from "./config/database.js";
import usuariosRouter from "./routes/users.routes.js";
import juegosRouter from "./routes/juegos.routes.js";

const app = express();
app.use(express.json());

await connectDB();

app.use("/api/consolas", consolasRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/juegos", juegosRouter);

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Estoy escuchando el puerto ${PORT}`);
});
