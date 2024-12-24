import { Router } from "express";
import { createUser, deleteUser, loginUser, updateRoleUser, updateUsername } from "../controller/user.controller.js";
import { reqControlDeleteUser, reqControlUpdateRole, reqControlUpdateUsername, reqCreateControl, reqLoginControl } from "../middleware/reqCorrecionUser.js";
import { isAdmin } from "../middleware/roleComprobation.js"


const router = Router()


router.post("/create", reqCreateControl, createUser)


router.post("/login", reqLoginControl, loginUser)

router.put("/update-username", reqControlUpdateUsername, updateUsername)

router.put("/update-role", reqControlUpdateRole, isAdmin, updateRoleUser)

router.delete("/delete", reqControlDeleteUser, deleteUser)


router.use((req, res, next) => {
    res.status(404).json({
        error: "La ruta que buscas no existe",
        method: req.method,
        path: req.originalUrl,
    });
});

export default router; // is imported in app.js