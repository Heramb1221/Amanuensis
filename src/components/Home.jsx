import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchNotes, addNote, updateNote } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const paste = useSelector((state) => state.paste.pastes.find(p => p._id === pasteId));

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    useEffect(() => {
        if (pasteId && paste) {
            setTitle(paste.title);
            setValue(paste.content);
        } else {
            setTitle('');
            setValue('');
        }
    }, [pasteId, paste]);

    function createPaste() {
        if (!title || !value) {
            toast.error("Title and content cannot be empty");
            return;
        }
    
        const paste = { title, content: value };
    
        if (pasteId) {
            dispatch(updateNote({ ...paste, _id: pasteId }));
            toast.success("Paste updated successfully");
        } else {
            dispatch(addNote(paste));
            toast.success("Paste created successfully");
        }
    
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center items-center px-4">
            <div className="w-full max-w-4xl mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-md md:max-w-[80%] lg:max-w-[60%]">
                <div className='flex flex-col md:flex-row gap-4'>
                    <input
                        className='p-3 w-full bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:ring-blue-400 focus:outline-none'
                        type='text'
                        placeholder='Enter title here'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='mt-4'>
                    <textarea
                        className='w-full p-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:ring-blue-400 focus:outline-none'
                        value={value}
                        placeholder='Enter content here'
                        onChange={(e) => setValue(e.target.value)}
                        rows={10}
                    />
                </div>

                <div className='mt-4 flex justify-end'>
                    <button onClick={createPaste} className='flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition duration-200'>
                        <FiSave />
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
