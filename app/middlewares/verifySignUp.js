// Importamos el objeto 'db' que contiene los modelos y constantes definidos en la aplicación
import db from "../models/index.js";

// Extraemos la constante ROLES y el modelo User del objeto db
const { ROLES, user: User } = db;

/**
 * Middleware para verificar si el nombre de usuario o el correo electrónico ya están en uso.
 */
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Buscamos un usuario con el mismo nombre de usuario proporcionado en la solicitud
    const userByUsername = await User.findOne({
      where: { username: req.body.username },
    });
    // Si se encuentra un usuario con ese nombre de usuario, respondemos con un error
    if (userByUsername) {
      return res.status(400).json({ message: "¡El nombre de usuario ya está en uso!" });
    }

    // Buscamos un usuario con el mismo correo electrónico proporcionado en la solicitud
    const userByEmail = await User.findOne({
      where: { email: req.body.email },
    });
    // Si se encuentra un usuario con ese correo electrónico, respondemos con un error
    if (userByEmail) {
      return res.status(400).json({ message: "¡El correo electrónico ya está en uso!" });
    }

    // Si no se encontraron duplicados, pasamos al siguiente middleware
    next();
  } catch (error) {
    // En caso de error en la base de datos u otro, respondemos con un error del servidor
    res.status(500).json({ message: error.message });
  }
};

/**
 * Middleware para verificar si los roles proporcionados existen en la lista de roles permitidos.
 */
export const checkRolesExisted = (req, res, next) => {
  const requestedRoles = req.body.roles ?? [req.body.role ?? "user"];

  if (
    !Array.isArray(requestedRoles) ||
    requestedRoles.length !== 1 ||
    !ROLES.includes(requestedRoles[0])
  ) {
    return res.status(400).json({ message: "Selecciona un tipo de usuario válido." });
  }

  req.body.role = requestedRoles[0];
  next();
};