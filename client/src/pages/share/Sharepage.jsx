import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from '/codesandboxpromanagelogo.png'; // Ensure the correct path for your logo
import './share.css'; // Ensure you have a CSS file for styling

const Sharepage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://caps-project-8ytf.onrender.com/api/share/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.taskDetails) {
    return <div>No task data available</div>;
  }

  const { taskDetails } = data;

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
            <div className={`priority-label ${taskDetails.priority.toLowerCase()}-priority`}>
              {taskDetails.priority === 'HIGH' && <span className='priority-label'>HIGH PRIORITY</span>}
              {taskDetails.priority === 'MODERATE' && <span className='priority-label'>MODERATE PRIORITY</span>}
              {taskDetails.priority === 'LOW' && <span className='priority-label'>LOW PRIORITY</span>}
            </div>
          </div>
          <p className="title">{taskDetails.title}</p>

          <div className="checklist-toggle-container">
            <p className="checklist-head">
              <span>
                Checklist ({taskDetails.checklist.filter(item => item.checked).length} / {taskDetails.checklist.length})
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
              <span className="date-label">Due Date:</span>
              <span className='date-value'>
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
