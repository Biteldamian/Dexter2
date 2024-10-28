import React, { useState } from 'react';
import { Play, Plus, XCircle } from 'lucide-react';

const TaskOrchestrator = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), description: newTask, status: 'pending' }]);
      setNewTask('');
    }
  };

  const handleExecuteTask = (taskId) => {
    // Implement task execution logic
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Task Orchestration</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="New task..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-900">{task.description}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExecuteTask(task.id)}
                className="p-2 text-indigo-600 hover:text-indigo-700"
              >
                <Play className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleRemoveTask(task.id)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskOrchestrator;