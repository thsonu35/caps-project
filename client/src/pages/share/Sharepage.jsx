import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './share.css'; // Import your custom CSS file
import logo from '../../../public/codesandboxpromanagelogo.png';

const Sharepage = () => {
  const { id } = useParams(); // Get the taskId from URL parameters
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/share/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch task data');
        }
        const data = await response.json();
        setTaskData(data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [id]);

  if (!taskData) {
    return <div>Loading...</div>;
  }

  const { taskDetails } = taskData;

  return (
    <div className="share-page-container">
      <section className="sidebar-container">
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={logo} alt="logo" />
            <p className="company-name">Pro Manage</p>
          </div>
        </div>
        <div className="task-details">
          <div className="priority-menu">
          <div className='priority-label'>
        <p className={`priority-label ${taskDetails.priority.toLowerCase()}-priority`}>

</p>
{taskDetails.priority === 'HIGH' && <span className='priority-label'>HIGH PRIORITY</span>}
  {taskDetails.priority === 'MODERATE' && <span className='priority-label'>MODERATE PRIORITY</span>}
  {taskDetails.priority === 'LOW' && <span className='priority-label'>LOW PRIORITY</span>}
  </div >          </div>
          <p className="title">{taskDetails.title}</p>

          <div className="checklist-toggle-container">
            <p className="checklist-head">
              <span>
                Checklist ({taskDetails.checklist.filter((item) => item.checked).length} / {taskDetails.checklist.length})
              </span>
            </p>
          </div>
          <div className="checklist-tasks">
            {taskDetails.checklist.map((item, index) => (
              <div key={index} className="task-item">
                <input type="checkbox" className="checkbox" checked={item.checked} readOnly />
                <p className="task-text">{item.text}</p>
              </div>
            ))}
          </div>
          {taskDetails.dueDate && (
            <p className="due-date">
              <span className="date-label">Due Date</span>
              <span className='date-value exceeded'>
                {new Date(taskDetails.dueDate).toLocaleDateString('en-US', {
                  month: 'short', // Display month as abbreviated name (e.g., Jan, Feb)
                  day: 'numeric' // Display day as number (e.g., 2)
                })}
              </span>
            </p>
          )}

        </div>
      </section>
    </div>
  );
};

export default Sharepage;
