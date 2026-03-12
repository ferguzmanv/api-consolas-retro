import jwt from "jsonwebtoken";

export const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("token recibido:", token);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensaje: "Token inválido" });
      }

      req.usuario = decoded;
      next();
    });
  } else {
    res.status(401).json({ mensaje: "Acceso no token autorizado" });
  }
};

export const autorizarRol = (rolPermitido) => {
  return (req, res, next) => {
    if (req.usuario && req.usuario.role === rolPermitido) {
      next();
    } else {
      res
        .status(403)
        .json({ mensaje: "No tienes permiso para realizar esta acción" });
    }
  };
};
