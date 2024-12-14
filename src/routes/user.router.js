import { Router } from "express";
import { createUser } from "../controller/user.controller.js";
import { reqControl } from "../middleware/reqCorrecionUser.js";
import { esAdmin } from "../middleware/comprobarRango.js"

const router = Router() // usa la función Router de Express, para construir las rutas 


router.post("/create", reqControl, createUser) // función que crea usuario, userController.js

/*
router.post("/login", reqControl, loginUser) // función para iniciar seción, userController.js
router.put("/actualizar", reqControlUpdateRango, esAdmin, actualizarRangoUser)
*/

router.use((req, res, next) => {
    res.status(404).json({
        error: "La ruta que buscas no existe",
        method: req.method,
        path: req.originalUrl,
    });
});

export default router; // es Importado en app.js