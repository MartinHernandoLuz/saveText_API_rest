import { createNoteDB, deleteNoteByNoteNameDB, getNoteByNoteNameDB, getNotesByUserNameDB } from "../models/notes.model";



export const createNote = async (req, res) => {
    const data = req.body;
    try {
        // send data to function in user.model.js
        const result = await createNoteDB(data);
        res.status(201).json(result); // if succesfull, status code 200 success 
    } catch (error) {
        const expectedErrors = [
            "This email or username does not exist",
            "Incorrect password"
        ];
        const errorStatus = expectedErrors.includes(error.message) ? 400 : 500
        res.status(errorStatus).json({ Error: error.message });
    }
}

export const getNoteByNoteName = async (req, res) => {
    const data = req.body;
    try {
        // send data to function in user.model.js
        const result = await getNoteByNoteNameDB(data);
        res.status(201).json(result); // if succesfull, status code 200 success 
    } catch (error) {
        const expectedErrors = [
            "Invalid credentials",
            "Note not found"
        ];
        const errorStatus = expectedErrors.includes(error.message) ? 400 : 500
        res.status(errorStatus).json({ Error: error.message });
    }
}

export const getNotesByUserName = async (req, res) => {
    const data = req.body;
    try {
        // send data to function in user.model.js
        const result = await getNotesByUserNameDB(data);
        res.status(201).json(result); // if succesfull, status code 200 success 
    } catch (error) {
        const expectedErrors = [
            "Invalid credentials"
        ];
        const errorStatus = expectedErrors.includes(error.message) ? 400 : 500
        res.status(errorStatus).json({ Error: error.message });
    }
}

export const deleteNoteByNoteName = async (req, res) => {
    const data = req.body;
    try {
        // send data to function in user.model.js
        const result = await deleteNoteByNoteNameDB(data);
        res.status(201).json(result); // if succesfull, status code 200 success 
    } catch (error) {
        const expectedErrors = [
            "Invalid credentials",
            "Note not found"
        ];
        const errorStatus = expectedErrors.includes(error.message) ? 400 : 500
        res.status(errorStatus).json({ Error: error.message });
    }
}