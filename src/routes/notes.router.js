import { Router } from "express";
import { createNote, deleteNoteByNoteName, getNoteByNoteName, getNotesByUserName } from "../controller/notes.controller.js";
import { hasPermission, hasPermission_dbComprobation } from "../middleware/roleComprobation.js";
import { reqCreateNoteControl, reqDeleteNoteControl, reqGetAllNotesByUserControl, reqGetNoteByNameControl } from "../middleware/reqCorrectionNotes.js";

const router = Router()


router.post("/createNote", hasPermission, reqCreateNoteControl, createNote)

router.post("/getNote", hasPermission, reqGetNoteByNameControl, getNoteByNoteName)

router.post("/getAllNotes", hasPermission, reqGetAllNotesByUserControl, getNotesByUserName)

router.delete("/deleteNote", hasPermission_dbComprobation, reqDeleteNoteControl, deleteNoteByNoteName)







router.use((req, res, next) => {
    res.status(404).json({
        error: "La ruta que buscas no existe",
        method: req.method,
        path: req.originalUrl,
    });
});

export default router; // is imported in app.js