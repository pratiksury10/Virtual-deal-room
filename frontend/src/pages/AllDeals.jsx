// src/pages/AllDeals.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AllDeals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/deals/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDeals(res.data);
      } catch (err) {
        console.error("Error fetching deals", err);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Deals</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md shadow-md bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Buyer Email</th>
              <th className="py-2 px-4 border-b">Seller Email</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{deal.title}</td>
                <td className="py-2 px-4 border-b">₹{deal.price}</td>
                <td className="py-2 px-4 border-b">
                  {deal.buyer?.email || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  {deal.seller?.email || "Not Assigned"}
                </td>
                <td className="py-2 px-4 border-b capitalize">{deal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeals;