import express from "express";
import Juego from "../models/Juego.js";
import { autenticarJWT, autorizarRol } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", autenticarJWT, async (req, res) => {
  const nuevoJuego = req.body;
  console.log("Nuevo juego recibido:", nuevoJuego);

  try {
    const creadorId = req.usuario.id;
    nuevoJuego.creador = creadorId;
    const nuevoJuegoDoc = new Juego(nuevoJuego);
    const juegoGuardado = await nuevoJuegoDoc.save();
    res.status(201).json(juegoGuardado);
  } catch (error) {
    console.error("Error al guardar el juego:", error);
    return res.status(500).json({
      mensaje: "Error al guardar el juego",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const juegos = await Juego.find()
      .populate("consola")
      .populate("creador", "username email");
    res.json(juegos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener juegos",
      error: error.message,
    });
  }
});

export default router;
