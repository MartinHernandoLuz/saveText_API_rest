import app from '../app.js'
import request from 'supertest'



describe('GetAll', () => {

    it('GET /hola - debería devolver un estado 200 y un mensaje "hola"', async () => {
        const response = await request(app).get('/hola').send();

        // Verificar el código de estado
        expect(response.statusCode).toBe(200);

        // Verificar que el cuerpo de la respuesta es un objeto y contiene el mensaje esperado
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'hola');
    });

    it('GET / - debería devolver un estado 200 y un mensaje "hola"', async () => {
        const response = await request(app).get('/').send();

        // Verificar el código de estado
        expect(response.statusCode).toBe(200);

        // Verificar que el cuerpo de la respuesta es un objeto y contiene el mensaje esperado
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', "there is nothing here");
    });
})