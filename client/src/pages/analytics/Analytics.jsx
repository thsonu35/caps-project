import React, { useEffect, useState } from 'react';
import './Analytics.css';
import Sidebar from '../../components/slidebar/slidebar';
import axios from 'axios'; // Import axios for API requests

const Analytics = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/tasks`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            }
          });


        if (response.data) {
          setTaskData(response.data);
          console.log('Fetched Task Data:', response.data); // Log fetched data
        } else {
          setTaskData([]);
          console.log('No data fetched.');
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, []);

  // Calculate task metrics
  const calculateAnalytics = () => {
    const analyticsData = {
      backlogTasks: 0,
      todoTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
      lowPriorityTasks: 0,
      highPriorityTasks: 0,
      moderatePriorityTasks: 0,
      dueDateTasks: 0,
    };

    taskData.forEach(task => {
      switch (task.status) {
        case 'BACKLOG':
          analyticsData.backlogTasks++;
          break;
        case 'TO DO':
          analyticsData.todoTasks++;
          break;
        case 'IN PROGRESS':
          analyticsData.inProgressTasks++;
          break;
        case 'DONE':
          analyticsData.completedTasks++;
          break;
        default:
          break;
      }

      switch (task.priority) {
        case 'LOW':
          analyticsData.lowPriorityTasks++;
          break;
        case 'MODERATE':
          analyticsData.moderatePriorityTasks++;
          break;
        case 'HIGH':
          analyticsData.highPriorityTasks++;
          break;
        default:
          break;
      }

      if (task.dueDate) {
        analyticsData.dueDateTasks++;
      }
    });

    return analyticsData;
  };

  const analyticsData = calculateAnalytics();

  return (
    <div>
      <Sidebar />
      <div className="analytics-container">
        <h1>Analytics</h1>
        <div className="analytics-cards">
          <div className="analytics-card">
            <ul>
              <li>Backlog Tasks <span>{analyticsData.backlogTasks}</span></li>
              <li>To-do Tasks <span>{analyticsData.todoTasks}</span></li>
              <li>In-Progress Tasks <span>{analyticsData.inProgressTasks}</span></li>
              <li>Completed Tasks <span>{analyticsData.completedTasks}</span></li>
            </ul>
          </div>
          <div className="analytics-card">
            <ul>
              <li>Low Priority <span>{analyticsData.lowPriorityTasks}</span></li>
              <li>High Priority <span>{analyticsData.highPriorityTasks}</span></li>
              <li>Moderate Priority <span>{analyticsData.moderatePriorityTasks}</span></li>
              <li>Due Date Tasks <span>{analyticsData.dueDateTasks}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
