// src/pages/CreateDeal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateDeal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    buyerId: '',
    sellerId: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/deals/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Deal created successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error creating deal');
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '50px',
        padding: '20px',
        backgroundColor: '#f4f7fb',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#4A90E2', fontSize: '1.8rem', marginBottom: '20px' }}>
        Create New Deal
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Deal Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{
            display: 'block',
            marginBottom: '15px',
            padding: '10px',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{
            display: 'block',
            marginBottom: '15px',
            padding: '10px',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s',
            height: '120px',
          }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={{
            display: 'block',
            marginBottom: '15px',
            padding: '10px',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Create Deal
        </button>
      </form>
    </div>
  );
};

export default CreateDeal;