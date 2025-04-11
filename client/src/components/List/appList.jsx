import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './appList.css';
import axios from "axios";

const AppList = () => {
  const BASE_URL = "https://student-job-tracker-nzlt.onrender.com";
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const statusOptions = ["applied", "interview", "offer", "rejected"];

  // Fetch Applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/list`);
      console.log(res.data);
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  };

  // Filter Applications
  const filterApplications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/filter-list`, {
        params: { status: filterStatus, startDate, endDate }
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to filter applications:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Delete Application
  const onDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      console.error("Failed to delete application:", err);
    }
  };

  // Update Status
  const onUpdateStatus = async (id) => {
    try {
      await axios.put(`${BASE_URL}/update/${id}`, { status: newStatus });
      setApplications(applications.map(app => 
        app._id === id ? { ...app, status: newStatus } : app
      ));
      setEditId(null);
      setNewStatus("");
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Start Editing
  const onEdit = (app) => {
    setEditId(app._id);
    setNewStatus(app.status);
  };

  // Handle Filter Submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    filterApplications();
  };
  const getFullLink = (link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return `https://${link}`;
    }
    return link;
  };
  return (
    <div className="list-container">
      <motion.div
        className="list-card"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="list-title">Submitted Applications</h1>
        
        {/* Filter Form */}
        <form className="filter-form" onSubmit={handleFilterSubmit}>
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <input
            type="date"
            className="filter-date"
            value={startDate}
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="filter-date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button type="submit" className="filter-btn">Filter</button>
        </form>

        {applications.length === 0 ? (
          <p className="empty-text">No applications found.</p>
        ) : (
          applications.map((app, index) => (
            <div key={app._id || index} className="app-entry">
              <p><strong>Company:</strong> {app.company}</p>
              <p><strong>Role:</strong> {app.role}</p>
              <p><strong>Status:</strong> 
                {editId === app._id ? (
                  <select
                    className="status-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                ) : (
                  app.status
                )}
              </p>
              <p><strong>Date:</strong> {new Date(app.date).toISOString().split('T')[0]}</p>
              <p><strong>Link:</strong> <a href={getFullLink(app.link)} target="_blank"> Link </a></p>
              <div className="button-group">
                {editId === app._id ? (
                  <button 
                    className="save-btn" 
                    onClick={() => onUpdateStatus(app._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button 
                    className="edit-btn" 
                    onClick={() => onEdit(app)}
                  >
                    Edit
                  </button>
                )}
                <button 
                  className="delete-btn" 
                  onClick={() => onDelete(app._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default AppList;