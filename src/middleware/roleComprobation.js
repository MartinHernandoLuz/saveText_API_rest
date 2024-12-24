import jwt from 'jsonwebtoken';
import db from '../config/db.js'; // Importa tu archivo de conexión a la base de datos


export const hasPermission = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const role = decoded.role;

    if (role === 'user' || role === 'admin') {
      next(); // Permitir acceso si tiene el rango adecuado
    } else {
      res.status(403).json({ error: 'Acceso denegado: permisos insuficientes' });
    }
  } catch (e) {
    res.status(401).json({ error: 'Token no válido o expirado' });
  }
}

export const hasPermission_dbComprobation = async (req, res, next) => {
  // Paso 1: Obtener el token del encabezado de autorización
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado' });
  }

  try {
    // Paso 2: Decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Paso 3: Consultar la base de datos para verificar el rango del usuario
    const query = "SELECT role_user FROM users WHERE email = ?";
    const [results] = await db.query(query, [email]); // Usa await para esperar el resultado de la consulta

    if (results.length === 0) {
      return res.status(403).json({ error: 'Acceso denegado: usuario no encontrado' });
    }

    const { role_user } = results[0];
    // Paso 4: Verificar si el rango es 'empleado' o 'administrador'
    if (role_user === 'empleado' || role_user === 'administrador') {
      next(); // Permitir acceso si tiene el rango adecuado
    } else {
      res.status(403).json({ error: 'Acceso denegado: permisos insuficientes' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Token no válido o expirado' });
  }
};

export const isAdmin = async (req, res, next) => {
  // Paso 1: Obtener el token del encabezado de autorización
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // Paso 2: Decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Paso 3: Consultar la base de datos para verificar el rango del usuario
    const query = "SELECT role_user FROM users WHERE email = ?";
    const [results] = await db.query(query, [email]); // Usa await para esperar el resultado de la consulta

    if (results.length === 0) {
      return res.status(403).json({ error: 'Acceso denegado: usuario no encontrado' });
    }


    const { role_user } = results[0];
    // Paso 4: Verificar si el rango es 'empleado' o 'admin'
    if (role_user === 'admin') {
      next(); // Permitir acceso si tiene el rango adecuado
    } else {
      res.status(403).json({ error: 'Acceso denegado: permisos insuficientes' });
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Token no válido o expirado' });
  }
};