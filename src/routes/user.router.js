import { Router } from "express";
import { createUser, loginUser, updateRoleUser, updateUsername } from "../controller/user.controller.js";
import { reqControlUpdateRole, reqControlUpdateUsername, reqCreateControl, reqLoginControl } from "../middleware/reqCorrecionUser.js";
import { isAdmin } from "../middleware/roleComprobation.js"


const router = Router() // usa la función Router de Express, para construir las rutas 


router.post("/create", reqCreateControl, createUser) // función que crea usuario, userController.js


router.post("/login", reqLoginControl, loginUser) // función para iniciar seción, userController.js

router.put("/update-username", reqControlUpdateUsername, updateUsername)

router.put("/update-role", reqControlUpdateRole, isAdmin, updateRoleUser)


router.use((req, res, next) => {
    res.status(404).json({
        error: "La ruta que buscas no existe",
        method: req.method,
        path: req.originalUrl,
    });
});

export default router; // is imported in app.js