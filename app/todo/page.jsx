"use client"
import { useEffect, useState } from 'react';
import { FiCheckCircle, FiClock, FiRefreshCw } from 'react-icons/fi';
import axiosInstance from '../components/SharedComponents/AxiosInstance/AxiosInstance';

import TodoForm from '../todo-form/page';
import TodoList from '../todo-list/page';

const TodoPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null);
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get('/tasks');
            const taskData = response.data.data || response.data;
            setTasks(taskData);
            

            const completed = taskData.filter(t => t.completed).length;
            setStats({
                total: taskData.length,
                completed: completed,
                pending: taskData.length - completed
            });
            
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleTaskAdded = () => {
        fetchTasks();
    };

    const handleTaskUpdated = () => {
        setEditingTask(null);
        fetchTasks();
    };

    const handleTaskDeleted = () => {
        fetchTasks();
    };

    const handleTaskToggled = () => {
        fetchTasks();
    };

    const handleEditStart = (task) => {
        setEditingTask(task);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-black bg-linear-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        ✨ Advanced Todo App
                    </h1>
                    <p className="text-gray-600 text-lg">Stay organized and get things done!</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
                                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiRefreshCw className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Completed</p>
                                <p className="text-3xl font-bold text-gray-800">{stats.completed}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <FiCheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Pending</p>
                                <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <FiClock className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="space-y-4">
                        <TodoForm 
                            onTaskAdded={handleTaskAdded}
                            onTaskUpdated={handleTaskUpdated}
                            editingTask={editingTask}
                            onCancel={handleCancelEdit}
                        />
                        
                        {/* Edit Mode Indicator */}
                        {editingTask && (
                            <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm text-center">
                                ✏️ Editing: {editingTask.title}
                            </div>
                        )}
                    </div>

                    {/* List Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Your Tasks ({tasks.length})
                            </h2>
                            <button
                                onClick={fetchTasks}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Refresh"
                            >
                                <FiRefreshCw className="w-5 h-5" />
                            </button>
                        </div>

                        <TodoList 
                            tasks={tasks}
                            onTaskDeleted={handleTaskDeleted}
                            onTaskToggled={handleTaskToggled}
                            onEditStart={handleEditStart}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoPage;