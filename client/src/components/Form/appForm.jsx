import React, { useState } from "react";
import { motion } from "framer-motion";
import './appForm.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppForm =  () => {
  const navigate = useNavigate();
  const BASE_URL = "https://student-job-tracker-nzlt.onrender.com";
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: '',
    date: '',
    link: ''
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/add`, formData);
      navigate('/list');
      setFormData({
        company: '',
        role: '',
        status: '',
        date: '',
        link: ''
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting application.");
    }
  };
  return(
    <div className="form">
    <motion.div
      className="form-card"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="form-title">Job Application</h1>
      <input
        type="text"
        name="company"
        className="form-inset"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        className="form-inset"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
      />
      <select
        name="status"
        className="form-inset"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="" disabled>Status</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <input
        type="date"
        name="date"
        className="form-inset"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="link"
        className="form-inset"
        placeholder="Link"
        value={formData.link}
        onChange={handleChange}
      />
      <button type="submit" className="form-button" onClick={handleSubmit}>Submit</button>
    </motion.div>
  </div>
  )
}

export default AppForm;