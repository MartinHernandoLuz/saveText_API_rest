import { createUserDB, deleteUserDB, loginUserDB, updateRoleUserDB, updateUsernameDB, } from '../models/user.model.js'

// handler for create a user
export const createUser = async (req, res) => {
    const data = req.body; // saca la data Email y contraseña
    try {
        // envía data a una función que está en userModel.js
        const result = await createUserDB(data);
        res.status(201).json(result); // si funciona, envía un 201 CREATED
    } catch (error) {
        // si hay error, envía el que llega por error o 500 INTERNAL por default
        const expectedErrors = [
            "this email or username already in use"
        ];
        const statusCode = expectedErrors.includes(error.message) ? 400 : 500
        res.status(statusCode).json({ "Error": error.message });
    }
}




// handler for login
export const loginUser = async (req, res) => {
    const data = req.body; // email and password
    try {
        // send data to function in user.model.js
        const result = await loginUserDB(data);
        res.status(200).json(result); // if succesfull, status code 200 success 
    } catch (error) {
        const expectedErrors = [
            "Email not found",
            "Incorrect password"
        ];
        const errorStatus = expectedErrors.includes(error.message) ? 400 : 500
        res.status(errorStatus).json({ Error: error.message });
    }
}

// handler for update the Username
export const updateUsername = async (req, res) => {
    const data = req.body; // email and username
    try {
        // send data to function in user.model.js
        const result = await updateUsernameDB(data);
        res.status(201).json(result); // 201 CREATED
    } catch (error) {
        const expectedErrors = [
            "Incorrect password",
            "Email not found",
            "14 days have not passed since the last update",
        ];
        const errorStatus = expectedErrors.includes(error.message) ? 400 : 500

        res.status(errorStatus).json({ Error: error.message });
    }
}

// handler for update the User role
export const updateRoleUser = async (req, res) => {
    const data = req.body; // saca la data Email y rango
    try {
        // send data to function in user.model.js
        const result = await updateRoleUserDB(data);
        res.status(201).json(result); // 201 CREATED
    } catch (error) {
        const errorStatus = error.message == "Email not found" ? 400 : 500

        res.status(errorStatus).json({ Error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const data = req.body; // saca la data Email y rango
    try {
        // send data to function in user.model.js
        const result = await deleteUserDB(data);
        res.status(201).json(result); // 201 CREATED
    } catch (error) {
        console.log(error.message)
        const expectedErrors = [
            "Email or username is incorrect",
            "Password is incorrect",
        ];
        const errorStatus = expectedErrors.includes(error.message) ? 400 : 500

        res.status(errorStatus).json({ Error: error.message });
    }
}