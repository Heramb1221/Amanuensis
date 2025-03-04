import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNotes, updateNote } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const ViewPaste = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (allPastes.length === 0) {
            dispatch(fetchNotes()); // Fetch notes only if the store is empty
        }
    }, [dispatch, allPastes.length]);

    const paste = useMemo(() => allPastes.find((p) => p._id === id) || { title: '', content: '' }, [allPastes, id]);

    const [title, setTitle] = useState(paste.title);
    const [content, setContent] = useState(paste.content);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setTitle(paste.title);
        setContent(paste.content);
    }, [paste.title, paste.content]);

    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Title and content cannot be empty!");
            return;
        }

        dispatch(updateNote({ _id: id, title, content }));
        setIsEditing(false);
        toast.success("Paste updated successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-6">
            <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <input
                    className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={!isEditing}
                />
                <textarea
                    className="w-full p-4 mt-4 h-60 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter content here"
                    disabled={!isEditing}
                />

                <div className="mt-4 flex justify-between">
                    {!isEditing ? (
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Note
                        </button>
                    ) : (
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    )}

                    <button
                        className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
                        onClick={() => navigate('/pastes')}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewPaste;
