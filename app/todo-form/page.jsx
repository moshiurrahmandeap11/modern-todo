// TodoForm.jsx
"use client";

import { useEffect, useState } from 'react';
import { FiCheck, FiPlus, FiX } from 'react-icons/fi';

import axiosInstance from '../components/SharedComponents/AxiosInstance/AxiosInstance';
import RichTextEditor from '../components/SharedComponents/RichTextEditor/RichTextEditor';

const TodoForm = ({ onTaskAdded, editingTask, onTaskUpdated, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (editingTask) {

                const response = await axiosInstance.put(`/tasks/${editingTask.id}`, {
                    title,
                    description
                });
                console.log('✅ Task updated:', response.data);
                if (onTaskUpdated) onTaskUpdated(response.data.data);
            } else {

                const response = await axiosInstance.post('/tasks', { 
                    title, 
                    description 
                });
                console.log('✅ Task added:', response.data);
                if (onTaskAdded) onTaskAdded(response.data.data);
            }
            

            setTitle('');
            setDescription('');
            
        } catch (error) {
            console.error('❌ Error:', error);
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-5">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {editingTask ? ' Edit Task' : ' Add New Task'}
                </h2>
                {editingTask && (
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <FiX className="w-5 h-5 text-gray-500" />
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        required
                    />
                </div>
                

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <RichTextEditor 
                        content={description}
                        onChange={setDescription}
                        placeholder="Write your task description here..."
                    />
                </div>
                

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
                >
                    {loading ? (
                        'Processing...'
                    ) : (
                        <>
                            {editingTask ? <FiCheck className="w-5 h-5" /> : <FiPlus className="w-5 h-5" />}
                            {editingTask ? 'Update Task' : 'Add Task'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default TodoForm;