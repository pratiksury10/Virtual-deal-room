import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncomingDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state

  // Fetch incoming deals when the component is mounted
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get('http://localhost:5008/api/deals/incoming', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Add Bearer prefix to token
        });
        console.log(res.data); // Log the response to check the data format
        setDeals(res.data);  // Set the state with incoming deals
      } catch (error) {
        console.error('Error fetching incoming deals:', error);
      } finally {
        setLoading(false);  // Set loading to false once the request is completed
      }
    };

    fetchDeals(); // Call the function to fetch the deals
  }, []);

  if (loading) {
    return <p>Loading incoming deals...</p>;  // Display loading message
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Incoming Deals</h1>
      {deals.length === 0 ? (
        <p>No incoming deals available.</p>
      ) : (
        <div className="space-y-4">
          {deals.map(deal => (
            <div key={deal._id} className="border rounded p-4 shadow-md">
              <p><strong>Title:</strong> {deal.title}</p>
              <p><strong>Description:</strong> {deal.description}</p>
              <p><strong>Price:</strong> ${deal.price}</p>
              <p><strong>Status:</strong> {deal.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomingDeals;
