import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FiEdit, FiEye, FiTrash2, FiShare2, FiClipboard } from 'react-icons/fi';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { fetchNotes } from '../redux/pasteSlice'; 


const Pastes = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [expanded, setExpanded] = useState({});
    useEffect(() => {
        if (pastes.length === 0) {
            dispatch(fetchNotes()); 
        }
    }, [dispatch, pastes.length]);
    
    const filteredData = pastes.filter(paste =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(deleteNote(pasteId));
    }

    function handleCopy(content) {
        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard!");
    }

    function handleShare(paste) {
        const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
        navigator.clipboard.writeText(shareUrl);
        toast("Share link copied!", { icon: '🔗' });
    }

    return (
        <div className="p-6 bg-black min-h-screen text-white">
            <input
                className="p-2 w-full rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="search"
                placeholder="Search pastes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h1 className="text-3xl font-extrabold mt-6">All Notes</h1>


            <div className="mt-5 bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700">
                {filteredData.length > 0 ? (
                    filteredData.map((paste) => (
                        <div key={paste._id} className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 mb-4">

                            <h2 className="text-xl font-bold">{paste.title}</h2>


                            <p className="text-gray-400 mt-2">
                                {expanded[paste._id] ? paste.content : `${paste.content.substring(0, 100)}... `}
                                {!expanded[paste._id] && paste.content.length > 100 && (
                                    <button
                                        className="text-blue-400 hover:underline ml-2"
                                        onClick={() => setExpanded({ ...expanded, [paste._id]: true })}
                                    >
                                        View
                                    </button>
                                )}
                            </p>


                            <div className="flex justify-between items-center mt-3">

                                <div className="flex gap-4 text-gray-300">
                                    <a href={`/?pasteId=${paste._id}`} className="hover:text-blue-400">
                                        <FiEdit />
                                    </a>
                                    <a href={`/pastes/${paste._id}`} className="hover:text-green-400">
                                        <FiEye />
                                    </a>
                                    <button onClick={() => handleDelete(paste._id)} className="hover:text-red-400">
                                        <FiTrash2 />
                                    </button>
                                    <button onClick={() => handleCopy(paste.content)} className="hover:text-yellow-400">
                                        <FiClipboard />
                                    </button>
                                    <button onClick={() => handleShare(paste)} className="hover:text-purple-400">
                                        <FiShare2 />
                                    </button>
                                </div>


                                <div className="flex items-center text-gray-500 text-sm">
                                    <FaRegCalendarAlt className="mr-2" />
                                    {new Date(paste.createdAt).toLocaleDateString()}
                                    <FaRegClock className="ml-4 mr-2" />
                                    {new Date(paste.createdAt).toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No pastes found.</p>
                )}
            </div>
        </div>
    );
};

export default Pastes;