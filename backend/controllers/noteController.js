import Note from '../models/noteModel.js';

export const getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};

export const createNote = async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.json(savedNote);
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedNote);
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.json({ message: 'Note deleted' });
};