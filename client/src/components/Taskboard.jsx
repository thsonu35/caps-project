import React from 'react';
import TodoCard from './todocard/TodoCard';

export default function Tasks({ id, task, sendDataToParent, onEdit, collapsedAll, toggleCollapse }) {

  const onDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      sendDataToParent();
      console.log('Task deleted successfully', taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const onMove = async (taskId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/tasks/movetask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ taskId, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to move task');
      }

      sendDataToParent(status);
      console.log('Task moved successfully', taskId, status);
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  return (
    <div>
      <TodoCard
        key={task._id}
        task={task}
        onEdit={() => onEdit(task)}
        onDelete={() => onDelete(task._id)}
        onMove={(status) => onMove(task._id, status)}
        sendDataToParent={sendDataToParent}
        collapsedAll={collapsedAll} // Pass collapsedAll
        toggleCollapse={toggleCollapse} // Pass toggleCollapse
      />
    </div>
  );
}
