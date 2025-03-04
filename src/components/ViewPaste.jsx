import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNotes, updateNote } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const ViewPaste = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const titleRef = useRef(null); // Reference for auto-focus

    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (allPastes.length === 0) {
            dispatch(fetchNotes());
        }
    }, [dispatch, allPastes.length]);

    const paste = useMemo(() => allPastes.find((p) => p._id === id) || { title: '', content: '' }, [allPastes, id]);

    const [title, setTitle] = useState(paste.title);
    const [content, setContent] = useState(paste.content);
    const [isEditing, setIsEditing] = useState(false);
    const [isChanged, setIsChanged] = useState(false); // Track if content is modified

    useEffect(() => {
        setTitle(paste.title);
        setContent(paste.content);
        setIsChanged(false);
    }, [paste.title, paste.content]);

    useEffect(() => {
        if (isEditing) {
            titleRef.current?.focus(); // Auto-focus on title when editing
        }
    }, [isEditing]);

    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Title and content cannot be empty!");
            return;
        }

        dispatch(updateNote({ _id: id, title, content }));
        setIsEditing(false);
        setIsChanged(false);
        toast.success("Paste updated successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4">
            <div className="w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <input
                    ref={titleRef}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter title here"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setIsChanged(true);
                    }}
                    disabled={!isEditing}
                />
                <textarea
                    className="w-full p-4 mt-4 h-48 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        setIsChanged(true);
                    }}
                    placeholder="Enter content here"
                    disabled={!isEditing}
                />

                <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
                    {!isEditing ? (
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Note
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                className={`px-4 py-2 rounded-lg transition ${isChanged ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"}`}
                                onClick={handleSave}
                                disabled={!isChanged}
                            >
                                Save Changes
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                onClick={() => {
                                    setTitle(paste.title);
                                    setContent(paste.content);
                                    setIsEditing(false);
                                    setIsChanged(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    <button
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
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
