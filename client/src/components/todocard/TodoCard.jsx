import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TodoCard.css';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import PopupComponent from '../popup/popup'; // Adjust path as per your file structure

import menuIcon from '../../../public/Group 544menu.png';

const TodoCard = ({ task, onEdit, onDelete, onMove, onUpdateCheckedCount, collapsedAll }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(collapsedAll);
  const [updatedChecklist, setUpdatedChecklist] = useState(task.checklist);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup

  useEffect(() => {
    setCollapsed(collapsedAll);
  }, [collapsedAll]);

  const toggleChecklist = () => {
    setCollapsed(!collapsed);
  };

  const copySharelink = (urllink) => {
    const fullUrl = `${window.location.origin}${urllink}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast.success("Share link copied");
    }).catch(err => {
      toast.error("Failed to copy share link");
    });
  };

  const handleCheck = async (index) => {
    try {
      setLoading(true); // Start loading

      const updatedList = [...updatedChecklist];
      updatedList[index].checked = !updatedList[index].checked;
      setUpdatedChecklist(updatedList);

      // Update the backend/database with the new checklist item
      const token = localStorage.getItem('token'); // Assuming you have a token stored in localStorage
      const taskId = task._id; // Assuming taskId is available in props or context

      const response = await axios.put(
        `http://localhost:3000/api/tasks/${taskId}/checklist/${index}`,
        { checked: updatedList[index].checked },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Task checklist item updated:', response.data);
      // Optionally, you can handle the response or trigger any UI updates
      onUpdateCheckedCount(taskId, updatedList);
    } catch (error) {
      console.error('Error updating checklist item:', error);
      // Optionally handle error states or display a message to the user
    } finally {
      setLoading(false); // Stop loading
      window.location.reload(); // Reload page after API call completes
    }
  };

  const checkedCount = task.checklist.filter((item) => item.checked).length;

  const handleDelete = async () => {
    try {
      setLoading(true); // Start loading
      await onDelete(task._id); // Call onDelete with task ID
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const statusOptions = ['TO DO', 'IN PROGRESS', 'DONE', 'BACKLOG'];
  const availableStatusOptions = statusOptions.filter(status => status !== task.status);

  // Function to check if the due date has passed
  const isPastDue = () => {
    const dueDate = new Date(task.dueDate);
    const currentDate = new Date();
    return dueDate < currentDate;
  };

  // Function to get month name and date
  const getMonthAndDate = () => {
    const dueDate = new Date(task.dueDate);
    const month = dueDate.toLocaleString('default', { month: 'short' });
    const date = dueDate.getDate();
    return `${month} ${date}`;
  };

  // Determine the background color class
  let backgroundColorClass = '';
  if (task.status === 'DONE') {
    backgroundColorClass = 'done';
  } else if (isPastDue()) {
    backgroundColorClass = 'past-due';
  } else {
    backgroundColorClass = 'grey-bg'; // Default grey background
  }

  const openDeletePopup = () => {
    setShowPopup(true); // Show the popup when delete is clicked
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  const handleDeleteConfirm = async () => {
    await handleDelete(); // Confirm delete and call handleDelete
    closePopup(); // Close the popup after deletion
  };

  const handleDeleteCancel = () => {
    setShowPopup(false); // Close the popup if user cancels delete
  };

  return (
    <div>
      {loading && (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      )}
      <aside className="card-content">
        <div className="priority-menu">
          <div className='priority-label'>
        <p className={`priority-label ${task.priority.toLowerCase()}-priority`}>

</p>
{task.priority === 'HIGH' && <span className='priority-label'>HIGH PRIORITY</span>}
  {task.priority === 'MODERATE' && <span className='priority-label'>MODERATE PRIORITY</span>}
  {task.priority === 'LOW' && <span className='priority-label'>LOW PRIORITY</span>}
  </div >
          <div className="menu-container">
            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
              <img src={menuIcon} alt="Menu" className="menu-icon" />
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={onEdit}>
                  Edit
                </div>
                <div className="dropdown-item" onClick={() => copySharelink(`/share/${task._id}`)}>
                  Share
                </div>
                <div className="dropdown-item delete" onClick={openDeletePopup}>
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="title" title={task.title}>{task.title}</p>
        
        {/* PopupComponent */}
        {showPopup && (
          <PopupComponent
            actionText="Delete"
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
        
        <div className="checklist-toggle-container">
          <p className="checklist-head">
            <span>
              Checklist ({checkedCount} / {task.checklist.length})
            </span>
            <button className="collapse-expand-btn" onClick={toggleChecklist}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className={`expand-icon ${collapsed ? 'collapsed' : ''}`}
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
              </svg>
            </button>
          </p>
        </div>

        {!collapsed && (
          <div className="checklist-tasks">
            {updatedChecklist.map((item, index) => (
              <div key={index} className="task-item">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(index)}
                />
                <p className="task-text">{item.text}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mutate-status-container">
          {task.dueDate && <div className={`duedate ${backgroundColorClass}`}>
            {getMonthAndDate()}
          </div>}
          <div className="mutate-btns-container">
            {availableStatusOptions.map((status, index) => (
              <button key={index} className="status-btn" onClick={() => onMove(status)}>
                {status}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

TodoCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    checklist: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
      })
    ).isRequired,
    dueDate: PropTypes.string, // dueDate is now optional
    status: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onUpdateCheckedCount: PropTypes.func.isRequired,
  collapsedAll: PropTypes.bool.isRequired,
};

export default TodoCard;
