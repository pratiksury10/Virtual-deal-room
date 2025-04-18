import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer', // default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, formData);

      alert('Registration successful! Please login now.');
      navigate('/login'); // 👈 Redirect to login after registration
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <div style={{ marginBottom: '15px', fontFamily: '"Roboto", sans-serif' }}>
            <label>
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={formData.role === 'buyer'}
                onChange={handleChange}
              /> Buyer
            </label>
            <label style={{ marginLeft: '20px' }}>
              <input
                type="radio"
                name="role"
                value="seller"
                checked={formData.role === 'seller'}
                onChange={handleChange}
              /> Seller
            </label>
          </div>

          <button type="submit" style={styles.button}>Register</button>
        </form>
        <div style={styles.redirectText}>
          <span>Already have an account?</span>
          <button onClick={handleLoginRedirect} style={styles.redirectButton}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f4f7fc',
  },
  formContainer: {
    background: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: '"Roboto", sans-serif',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    fontFamily: '"Roboto", sans-serif',
  },
  button: {
    padding: '10px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  redirectText: {
    textAlign: 'center',
    marginTop: '15px',
  },
  redirectButton: {
    background: 'none',
    border: 'none',
    color: '#007BFF',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'underline',
  }
};

export default Register;