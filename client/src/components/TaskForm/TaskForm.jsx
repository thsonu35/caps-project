import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskForm.css';
import { FaTrashAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Toaster, toast } from 'react-hot-toast';

const TaskForm = ({ task: initialTask, onSave, onCancel }) => {
  const [task, setTask] = useState({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    priority: initialTask?.priority || 'LOW',
    dueDate: initialTask?.dueDate ? new Date(initialTask.dueDate) : null,
    checklist: initialTask?.checklist || [],
  });

  const [isTitleValid, setIsTitleValid] = useState(true);

  useEffect(() => {
    if (initialTask) {
      setTask({
        title: initialTask.title || '',
        description: initialTask.description || '',
        priority: initialTask.priority || 'LOW',
        dueDate: initialTask.dueDate ? new Date(initialTask.dueDate) : null,
        checklist: initialTask.checklist || [],
      });
    }
  }, [initialTask]);

  const addChecklistItem = () => {
    setTask({
      ...task,
      checklist: [...task.checklist, { text: '', checked: false, status: 'INCOMPLETE' }],
    });
  };

  const deleteChecklistItem = (index) => {
    const newChecklist = [...task.checklist];
    newChecklist.splice(index, 1);
    setTask({
      ...task,
      checklist: newChecklist,
    });
  };

  const handleSave = async () => {
    if (task.title.trim() === '') {
      setIsTitleValid(false);
      return;
    }

    const updatedTask = {
      ...task,
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
    };

    try {
      const token = localStorage.getItem('token');

      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      let response;

      if (initialTask) {
        response = await axios.put(`http://localhost:3000/api/update/${initialTask._id}`, updatedTask, { headers });
        toast.success('Task updated');

      } else {
        response = await axios.post('http://localhost:3000/api/tasks', updatedTask, { headers });
      }

      console.log('Task successfully saved:', response.data);
      onSave(response.data);
    } catch (error) {
      console.error('Error saving task:', error.response ? error.response.data : error.message);
    }
  };

  const checkedCount = task.checklist.filter(item => item.checked).length;

  const CustomDateButton = React.forwardRef(({ value, onClick }, ref) => (
    <button className="due-date-button" onClick={onClick} ref={ref}>
      {value || 'Select Due Date'}
    </button>
  ));

  return (
    <div className="task-form">
      <Toaster />
      <div className="form-group">
        <label>Title <k>*</k> </label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => {
            setTask({
              ...task,
              title: e.target.value,
            });
            if (!isTitleValid && e.target.value.trim() !== '') {
              setIsTitleValid(true);
            }
          }}
          placeholder="Enter task title"
          className={!isTitleValid ? 'invalid' : ''}
        />
        {!isTitleValid && <div className="error-message">Title is required</div>}
      </div>

      <div className="form-group priority-options">
        <label>Select Priority <k>*</k> :</label>
        <button
          className={`priority-button high ${task.priority === 'HIGH' ? 'active' : ''}`}
          onClick={() => setTask({ ...task, priority: 'HIGH' })}
        ><div className="priority-icon"></div>
          High Priority
        </button>
        <button
          className={`priority-button moderate ${task.priority === 'MODERATE' ? 'active' : ''}`}
          onClick={() => setTask({ ...task, priority: 'MODERATE' })}
        ><div className="priority-icon"></div>
          Moderate Priority
        </button>
        <button
          className={`priority-button low ${task.priority === 'LOW' ? 'active' : ''}`}
          onClick={() => setTask({ ...task, priority: 'LOW' })}
        ><div className="priority-icon"></div>
          Low Priority
        </button>
      </div>

      <div className="form-group">
        <label>Checklist <k>*</k>  ({checkedCount}/{task.checklist.length})</label>
        <div className="checklist-container">
          {task.checklist.map((item, index) => (
            <div key={index} className="checklist-item">
              <input
                type="checkbox"
                className="checkbox"
                checked={item.checked}
                onChange={() => {
                  const newChecklist = [...task.checklist];
                  newChecklist[index].checked = !newChecklist[index].checked;
                  setTask({
                    ...task,
                    checklist: newChecklist,
                  });
                }}
              />
              <input
                type="text"
                value={item.text}
                onChange={(e) => {
                  const newChecklist = [...task.checklist];
                  newChecklist[index].text = e.target.value;
                  setTask({
                    ...task,
                    checklist: newChecklist,
                  });
                }}
                placeholder="Enter checklist item"
                className="task-input"
              />
              <FaTrashAlt className="delete" onClick={() => deleteChecklistItem(index)} />
            </div>
          ))}
        </div>
        <div className="checklist-input">
          <button className="add-button" onClick={addChecklistItem}>+ Add</button>
        </div>
      </div>

      <div className="form-group button-group">
        <div>
          <DatePicker
            selected={task.dueDate}
            onChange={(date) => {
              const adjustedDate = new Date(date);
              adjustedDate.setDate(adjustedDate.getDate() + 1);
              setTask({ ...task, dueDate: adjustedDate });
            }}
            customInput={<CustomDateButton />}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <button className="cancel" onClick={onCancel}>Cancel</button>
          <button className="save" onClick={handleSave}>{initialTask ? 'Update' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
