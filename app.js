import express from "express";
import 'dotenv/config'
import { swaggerDOC } from './swagger/swagger.js'


import userRoute from './src/routes/user.router.js'

// the typical 
const app = express();
app.use(express.json());





// ROUTES
app.use("/user", userRoute)



app.get("/hola", (req, res) => {
    res.status(200).json({ message: "hola" })
})




// documentation, swagger
const PORT = process.env.PORT || 3000;
swaggerDOC(app, PORT);

// default rute
app.use("/", (req, res) => {
    res.json({ mensaje: "acá no hay nada" })
})



/************* ARRANCAR SERVER *********************/
// En Index.js

export default app;