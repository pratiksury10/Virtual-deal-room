// src/pages/MyDeals.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyDeals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/deals/my-deals`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeals(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load deals');
      }
    };

    fetchDeals();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '50px' }}>
      <h2>My Created Deals</h2>
      {deals.length === 0 ? (
        <p>No deals found.</p>
      ) : (
        deals.map((deal) => (
          <div key={deal._id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
            <h3>{deal.title}</h3>
            <p>{deal.description}</p>
            <p><strong>Price:</strong> ₹{deal.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyDeals;
