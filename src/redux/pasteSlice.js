import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// ✅ Set Axios base URL dynamically from .env
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Thunks for CRUD operations

export const fetchNotes = createAsyncThunk('paste/fetchNotes', async () => {
    const response = await axios.get(`${BASE_URL}/api/pastes`);
    return response.data;
});

export const addNote = createAsyncThunk('paste/addNote', async (note) => {
    const response = await axios.post(`${BASE_URL}/api/pastes`, note);
    return response.data;
});

export const updateNote = createAsyncThunk('paste/updateNote', async (note) => {
    const response = await axios.put(`${BASE_URL}/api/pastes/${note._id}`, note);
    return response.data;
});

export const deleteNote = createAsyncThunk('paste/deleteNote', async (id) => {
    await axios.delete(`${BASE_URL}/api/pastes/${id}`);
    return id;
});

// ✅ Redux slice
const pasteSlice = createSlice({
    name: 'paste',
    initialState: { pastes: [] },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.pastes = action.payload;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.pastes.push(action.payload);
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const index = state.pastes.findIndex(p => p._id === action.payload._id);
                if (index !== -1) state.pastes[index] = action.payload;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.pastes = state.pastes.filter(paste => paste._id !== action.payload);
            });
    },
});

export default pasteSlice.reducer;
