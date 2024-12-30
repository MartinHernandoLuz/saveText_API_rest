import { createNoteDB, deleteNoteByNoteNameDB, getNoteByNoteNameDB, getNotesByUserNameDB, updateNoteNameDB, updateTextDB } from "../models/notes.model.js";



export const createNote = async (req, res) => {
    const data = req.body;
    try {
        // send data to function in user.model.js
        const result = await createNoteDB(data);
        res.status(201).json(result); // if succesfull, status code 200 success 
    } catch (error) {
        const expectedErrors = [
            "This email or username does not exist",
            "Incorrect password",
            "This note_name already exist"
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

export const updateNoteName = async (req, res) => {
    const data = req.body;
    try {
        // send data to function in user.model.js
        const result = await updateNoteNameDB(data);
        res.status(201).json(result); // if succesfull, status code 200 success 
    } catch (error) {
        const expectedErrors = [
            "Invalid credentials",
            "Note name does not exist",
            "New note name already exists"
        ];
        const errorStatus = expectedErrors.includes(error.message) ? 400 : 500
        res.status(errorStatus).json({ Error: error.message });
    }
}

export const updateText = async (req, res) => {
    const data = req.body;
    try {
        // send data to function in user.model.js
        const result = await updateTextDB(data);
        res.status(201).json(result); // if succesfull, status code 200 success 
    } catch (error) {
        const expectedErrors = [
            "Invalid credentials",
            "The note name does not exist"
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