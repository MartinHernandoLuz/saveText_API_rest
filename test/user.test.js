import app from '../app.js'
import request from 'supertest'
import db from '../src/config/db.js'
import jwt from 'jsonwebtoken'


const tokenAdmin = jwt.sign(
    { email: "admin@admin.com", role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // token expiration time
);


describe('user/create', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
        await db.query("ROLLBACK")
    })


    it('Post /user/create - should return a status 201', async () => {
        const response = await request(app)
            .post('/user/create')
            .send({
                "email": "ho@la.com",
                "password": "jhgfdsdasde3d",
                "username": "@h22sda342",
                "full_name": "hola 22comado estas",
            });

        // check the status code
        expect(response.statusCode).toBe(201);

        // check if the response body is an object and contains the expected message
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message', 'user @h22sda342 created successfully');
    });
})



describe('user/login', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
        await db.query("ROLLBACK")
    })


    it('Post /login - should return a status 201', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({
                "email": "admin@admin.com",
                "password": "jhgfdscrdasd",
            });

        // check the status code
        expect(response.statusCode).toBe(200);

        // check if the response body is an object and contains the expected message
        expect(response.body).toBeInstanceOf(Object);;
        expect(typeof response.body.token).toBe('string');
    });
})


describe('user/update-role', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
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

        // check the status code
        expect(response.statusCode).toBe(201);

        // check if the response body is an object and contains the expected message
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('newRole', 'user')
        expect(response.body).toHaveProperty('email', 'admin@admin.com')
        expect(typeof response.body.email).toBe('string');
        expect(typeof response.body.newRole).toBe('string');
    });
})


describe('user/update-username', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
        await db.query("ROLLBACK")
    })

    /*
        it('Put /update-username - should return a status 201', async () => {
            const response = await request(app)
                .put('/user/update-username')
                .set("Authorization", `Bearer ${tokenAdmin}`)
                .send({
                    "email": "admin@admin.com",
                    "password": "jhgfdscrdasd", // jhgfdscrdasd
                    "username": "@admin2",
                });
    
            // verify status code
            expect(response.statusCode).toBe(201);
    
            // check if the response body is an object and contains the expected message
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('newUsername', '@admin2')
            expect(response.body).toHaveProperty('email', 'admin@admin.com')
            expect(typeof response.body.email).toBe('string');
            expect(typeof response.body.newUsername).toBe('string');
        });
    */

    it('Put /update-username - should return a status 400', async () => {
        const response = await request(app)
            .put('/user/update-username')
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .send({
                "email": "admin@admin.com",
                "password": "jhgfdscrdasd", // jhgfdscrdasd
                "username": "@admin2",
            });

        // verify status code
        expect(response.statusCode).toBe(400);

        // check if the response body is an object and contains the expected message
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('Error', '14 days have not passed since the last update')
        expect(typeof response.body.Error).toBe('string');
    });

})

describe('user/delete', () => {

    beforeEach(async () => {
        // begin transaction
        await db.query("BEGIN")
    });

    afterEach(async () => {
        // go rollback in transaction
        await db.query("ROLLBACK")
    })



    it('Delete /delete should return a status 200', async () => {
        const response = await request(app)
            .delete('/user/delete')
            .send({
                "email": "hola@hola.com",
                "password": "jhgfdscr4",
                "username": "@holaxd",
            });

        // verify status code
        expect(response.statusCode).toBe(201);

        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe("User deleted successfully")
    });

})