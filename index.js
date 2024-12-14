import app from './app.js'; // viene de app.js en este mismo directorio
import 'dotenv/config'



// manejo de Errores inesperados
app.use((err, req, res, next) => {
  console.error(err.stack); // Log del error
  res.status(500).json({ error: "Something went wrong on the server" });
});



// esto es sólo para arrancar el server
const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});