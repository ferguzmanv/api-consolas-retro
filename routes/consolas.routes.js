import express from "express";
import Consola from "../models/Console.js";

const router = express.Router();

router.get("/", (req, res) => {
  Consola.find()
    .then((consolas) => res.json(consolas))
    .catch((err) =>
      res
        .setMaxListeners(500)
        .json({ mensaje: "error al obtener consolas", error: err.message }),
    );
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const consola = await Consola.find({ _id: id, isDeleted: false });

    if (consola) {
      res.json(consola);
    } else {
      res.status(404).json({ mensaje: "Consola no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la consola",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const nuevaConsolaData = req.body;

  try {
    const nuevaConsola = new Consola(nuevaConsolaData);
    const consolaGuardada = await nuevaConsola.save();

    res.status(201).json(consolaGuardada);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear la consola",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const consolaActualizada = await Consola.findOneAndReplace(
      { _id: id },
      datosActualizados,
      { new: true },
    );

    if (consolaActualizada) {
      res.json(consolaActualizada);
    } else {
      res.status(404).json({ mensaje: "Consola no encontrada" });
    }
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la consola",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const datosParciales = req.body;

  try {
    const consolaActualizada = await Consola.findByIdAndUpdate(
      id,
      datosParciales,
      { new: true },
    );

    if (consolaActualizada) {
      res.json(consolaActualizada);
    } else {
      res.status(404).json({ mensaje: "Consola no encontrada" });
    }
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la consola",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const consolaEliminada = await Consola.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    if (consolaEliminada) {
      res.json({ mensaje: "Consola eliminada correctamente (soft delete)" });
    } else {
      res.status(404).json({ mensaje: "Consola no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la consola",
      error: error.message,
    });
  }
});

export default router;
