import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

// Route to get all notes
router.get('/', getNotes);

// Route to add a new note
router.post('/', createNote);

// Route to update an existing note
router.put('/:id', updateNote);

// Route to delete a note
router.delete('/:id', deleteNote);

export default router;
