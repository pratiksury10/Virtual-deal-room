import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        let response;

        if (role === "buyer") {
          response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/deals/my-deals`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        if (role === "seller") {
          response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/deals/pending`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        setDeals(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deals:", error);
        setLoading(false);
      }
    };

    if (role) {
      fetchDeals();
    }
  }, [role]);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}>Loading deals...</div>;
  }

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "auto",
        backgroundColor: "#f4f7fb",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ color: "#4A90E2" }}>🚀 Virtual Deal Room - {role?.toUpperCase()} Dashboard</h2>
      <p style={{ fontSize: "1.1rem" }}>
        Logged in as: <strong>{email}</strong>
      </p>

      <hr style={{ margin: "20px 0", border: "1px solid #e2e2e2" }} />

      {/* Buyer Dashboard */}
      {role === "buyer" && (
        <div>
          <h3 style={{ color: "#5F6368" }}>👤 Buyer Panel</h3>
          <button onClick={() => navigate("/create-deal")} style={buttonStyle}>
            ➕ Create New Deal
          </button>
          <button onClick={() => navigate("/dashboard/my-deals")} style={buttonStyle}>
            📦 View My Deals
          </button>

          {deals.length > 0 ? (
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {deals.map((deal) => (
                <li key={deal._id} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => navigate(`/deal/${deal._id}/chat`)}
                    style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
                  >
                    🔗 Join Chat for Deal {deal._id}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No deals available. Check back later!</p>
          )}

          <p>💬 Start browsing seller deals (for chat demo):</p>
          <button
            onClick={() => navigate("/deal/456/chat")}
            style={{ ...buttonStyle, backgroundColor: "#4caf50" }}
          >
            🔗 Join Chat for Deal 456
          </button>
        </div>
      )}

      {/* Seller Dashboard */}
      {role === "seller" && (
        <div>
          <h3 style={{ color: "#5F6368" }}>🧑‍💼 Seller Panel</h3>
          <button
            onClick={() => navigate("/seller-dashboard/incoming-deals")}
            style={buttonStyle}
          >
            📥 View Incoming Deals
          </button>

          {deals.length > 0 ? (
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
              {deals.map((deal) => (
                <li key={deal._id} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => navigate(`/deal/${deal._id}/chat`)}
                    style={{ ...buttonStyle, backgroundColor: "#2196f3" }}
                  >
                    🔗 Chat with Buyer for Deal {deal._id}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending deals yet. Check back later!</p>
          )}

          <p>💬 Manage your deals (for chat demo):</p>
          <button
            onClick={() => navigate("/deal/456/chat")}
            style={{ ...buttonStyle, backgroundColor: "#2196f3" }}
          >
            🔗 Chat with Buyer for Deal 456
          </button>
        </div>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          marginLeft: "200px",
          backgroundColor: "crimson",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "50%",
          fontSize: "1.1rem",
        }}
      >
        🔒 Logout
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: "12px 20px",
  margin: "10px 0",
  backgroundColor: "#2196f3",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  fontSize: "1rem",
  transition: "background-color 0.3s",
};

export default Dashboard;