import app from '../app.js'
import request from 'supertest'
import db from '../src/config/db.js'
import jwt from 'jsonwebtoken'

const token = jwt.sign(
    { email: "juan.perez@example.com", rango: "administrador" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Tiempo de expiración del token
);

const tokenAdmin = jwt.sign(
    { email: "admin@admin.com", role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Tiempo de expiración del token
);


describe('user/create', () => {

    beforeEach(async () => {
        // Iniciar una conexión para la transacción
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // Realizar el rollback de la transacción
        await db.query("ROLLBACK")
    })


    it('Post /user - debería devolver un estado 201', async () => {
        const response = await request(app)
            .post('/user/create')
            .send({
                "email": "hola@hola.com",
                "password": "jhgfdscr4",
                "username": "@holaxd",
                "full_name": "hola como estas"
            });

        // Verificar el código de estado
        expect(response.statusCode).toBe(201);

        // Verificar que el cuerpo de la respuesta es un objeto y contiene el mensaje esperado
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'user @holaxd created successfully');
    });
})



describe('user/login', () => {

    beforeEach(async () => {
        // Iniciar una conexión para la transacción
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // Realizar el rollback de la transacción
        await db.query("ROLLBACK")
    })


    it('Post /login - debería devolver un estado 201', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({
                "email": "admin@admin.com",
                "password": "jhgfdscrdasd",
            });

        // Verificar el código de estado
        expect(response.statusCode).toBe(200);

        // Verificar que el cuerpo de la respuesta es un objeto y contiene el mensaje esperado
        expect(response.body).toBeInstanceOf(Object);;
        expect(typeof response.body.token).toBe('string');
    });
})


describe('user/update-role', () => {

    beforeEach(async () => {
        // Iniciar una conexión para la transacción
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // Realizar el rollback de la transacción
        await db.query("ROLLBACK")
    })


    it('Put /update-role - debería devolver un estado 201', async () => {
        const response = await request(app)
            .put('/user/update-role')
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .send({
                "email": "admin@admin.com",
                "role": "user",
            });

        // Verificar el código de estado
        expect(response.statusCode).toBe(201);

        // Verificar que el cuerpo de la respuesta es un objeto y contiene el mensaje esperado
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('newRole', 'user')
        expect(response.body).toHaveProperty('email', 'admin@admin.com')
        expect(typeof response.body.email).toBe('string');
        expect(typeof response.body.newRole).toBe('string');
    });
})