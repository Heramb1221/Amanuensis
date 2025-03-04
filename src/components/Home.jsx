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

//handles fetching notes
    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);
 //updates the form when you select a note to edit.   
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
    
        const paste = {
            title,
            content: value,
        };
    
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
        <div className="min-h-screen bg-gray-900 text-gray-100 items-center flex justify-center">
            <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-gray-100 rounded-lg shadow-md w-[60%]">
                <div className='flex flex-row gap-4 place-content-between'>
                    <input
                        className='p-2 rounded-xl w-full pl-4 bg-gray-700 text-gray-100 border border-gray-600 focus:ring-blue-400 focus:outline-none'
                        type='text'
                        placeholder='Enter title here'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='mt-6'>
                    <textarea
                        className='w-full rounded-xl p-4 bg-gray-700 text-gray-100 border border-gray-600 focus:ring-blue-400 focus:outline-none'
                        value={value}
                        placeholder='Enter content here'
                        onChange={(e) => setValue(e.target.value)}
                        rows={15}
                    />
                </div>

                <div className='mt-4 flex justify-end'>
                    <button onClick={createPaste} className='flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition duration-200'>
                        <FiSave />
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;