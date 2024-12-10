import express from "express";
import { swaggerDOC } from './swagger/swagger.js'

import 'dotenv/config'



const app = express(); // traigo a Express 

app.use(express.json()); // avisarle a Express que voy a enviar JSON



app.get("/hola", (req, res) => {
    res.status(200).json({ message: "hola" })
})

// documentación, swagger
const PORT = process.env.PORT || 3000;
swaggerDOC(app, PORT);

// ruta default
app.use("/", (req, res) => {
    res.json({ mensaje: "acá no hay nada" })
})



/************* ARRANCAR SERVER *********************/
// En Index.js

export default app;