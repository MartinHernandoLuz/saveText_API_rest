import app from '../app.js'
import request from 'supertest'
import db from '../src/config/db.js'
import jwt from 'jsonwebtoken'


const tokenAdmin = jwt.sign(
    { email: "admin@admin.com", role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // token expiration time
);

const tokenUser = jwt.sign(
    { email: "hola@hola.com", role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // token expiration time
);


describe('notes/create', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
        await db.query("ROLLBACK")
    })

    it('Post /notes/create - should return a status 201', async () => {
        const response = await request(app)
            .post('/notes/create')
            .send({
                "email": "hola@hola.com",
                "password": "jhgfdscr4",
                "username": "@holaxd",
                "full_name": "hola como estas",
                "note_name": "fiumba",
                "text": "jajajaj cdcdcdcdcd"
            });

        // check the status code
        expect(response.statusCode).toBe(201);

        // check if the response body is an object and contains the expected message
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'Note fiumba created successfully');
    });
})