// src/pages/SellerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();

  const fetchDeals = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/deals/pending`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setDeals(res.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  const updateDealStatus = async (id, action) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/deals/${id}/${action}`; // accept or reject
      await axios.patch(
        url,
        {},
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchDeals(); // refresh the list
    } catch (error) {
      console.error(`Error ${action}ing deal:`, error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Seller Dashboard - Pending Deals</h1>
      {deals.length === 0 ? (
        <p>No pending deals to review.</p>
      ) : (
        <div className="space-y-4">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="border rounded p-4 shadow-md flex flex-col gap-2"
            >
              <p><strong>Title:</strong> {deal.title}</p>
              <p><strong>Description:</strong> {deal.description}</p>
              <p><strong>Price:</strong> ${deal.price}</p>
              <p><strong>Status:</strong> {deal.status}</p>
              <div className="space-x-2">
                <button
                  onClick={() => updateDealStatus(deal._id, "accept")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateDealStatus(deal._id, "reject")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
                <button
                  onClick={() => navigate(`/deal/${deal._id}/chat`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Join Chat
                </button>   
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
