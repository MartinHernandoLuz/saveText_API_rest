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





describe('notes/createNote', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
        await db.query("ROLLBACK")
    })

    it('Post /notes/createNote - should return a status 201', async () => {
        const response = await request(app)
            .post('/notes/createNote')
            .set("Authorization", `Bearer ${tokenUser}`)
            .send({
                "email": "hola@hola.com",
                "password": "jhgfdscr4",
                "user_username": "@holaxd",
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

describe('notes/getNote', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
        await db.query("ROLLBACK")
    })

    it('Post /notes/getNote - should return a status 201', async () => {
        const response = await request(app)
            .post('/notes/getNote')
            .set("Authorization", `Bearer ${tokenUser}`)
            .send({
                "email": "hola@hola.com",
                "password": "jhgfdscr4",
                "user_username": "@holaxd",
                "note_name": "primera nota"
            });

        // check the status code
        expect(response.statusCode).toBe(201);

        // check if the response body is an object and contains the expected message
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe("hola cómo estás");
    });
})

describe('notes/getAllNotes', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
        await db.query("ROLLBACK")
    })

    it('Post /notes/getAllNotes - should return a status 201', async () => {
        const response = await request(app)
            .post('/notes/getAllNotes')
            .set("Authorization", `Bearer ${tokenUser}`)
            .send({
                "email": "hola@hola.com",
                "password": "jhgfdscr4",
                "user_username": "@holaxd"
            });

        // check the status code
        expect(response.statusCode).toBe(201);

        // check if the response body is an object and contains the expected message
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.notes).toBeInstanceOf(Array);
    });
})

describe('notes/deleteNote', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
        await db.query("ROLLBACK")
    })

    it('Post /notes/deleteNote - should return a status 201', async () => {
        const response = await request(app)
            .delete('/notes/deleteNote')
            .set("Authorization", `Bearer ${tokenUser}`)
            .send({
                "email": "hola@hola.com",
                "password": "jhgfdscr4",
                "user_username": "@holaxd",
                "note_name": "primera nota"
            });

        // check the status code
        expect(response.statusCode).toBe(201);

        // check if the response body is an object and contains the expected message
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBe("Note successfully deleted");
    });
})