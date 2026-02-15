"use client";

import { useState } from 'react';
import { FiCheckCircle, FiCircle, FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../components/SharedComponents/AxiosInstance/AxiosInstance';

const TodoList = ({ tasks, onTaskDeleted, onTaskToggled, onEditStart }) => {
    const [deletingId, setDeletingId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);

    const handleToggle = async (id, completed) => {
        setTogglingId(id);
        try {
            await axiosInstance.patch(`/tasks/${id}`, { completed: !completed });
            if (onTaskToggled) onTaskToggled();
        } catch (error) {
            console.error('Toggle error:', error);
        } finally {
            setTogglingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        
        setDeletingId(id);
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            if (onTaskDeleted) onTaskDeleted();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete task');
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // **ফিক্স ১: tasks undefined হলে empty array ধরে নিবে**
    const safeTasks = tasks || [];
    
    // **ফিক্স ২: length চেক করার আগে safeTasks ব্যবহার করুন**
    if (safeTasks.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
                <p className="text-gray-500">Create your first task to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {safeTasks.map((task) => (
                <div
                    key={task.id}
                    className={`group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 ${
                        task.completed ? 'border-l-green-500 bg-green-50/30' : 'border-l-blue-500'
                    }`}
                >
                    <div className="flex items-start gap-4">
                        {/* Checkbox Button */}
                        <button
                            onClick={() => handleToggle(task.id, task.completed)}
                            disabled={togglingId === task.id}
                            className="mt-1 shrink-0"
                        >
                            {task.completed ? (
                                <FiCheckCircle className="w-6 h-6 text-green-500 hover:text-green-600 transition" />
                            ) : (
                                <FiCircle className="w-6 h-6 text-gray-400 hover:text-blue-500 transition" />
                            )}
                        </button>

                        {/* Task Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-semibold text-lg ${
                                    task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                                }`}>
                                    {task.title}
                                </h3>
                                {task.created_at && (
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <FiClock className="w-3 h-3" />
                                        {formatDate(task.created_at)}
                                    </span>
                                )}
                            </div>
                            
                            {/* Description */}
                            <div className={`prose prose-sm max-w-none ${
                                task.completed ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                {task.description ? (
                                    <div dangerouslySetInnerHTML={{ __html: task.description }} />
                                ) : (
                                    <p className="text-gray-400 italic">No description</p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEditStart(task)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Edit task"
                            >
                                <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(task.id)}
                                disabled={deletingId === task.id}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                title="Delete task"
                            >
                                <FiTrash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;