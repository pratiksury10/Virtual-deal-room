// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import DealChat from "./pages/DealChat";  // Assuming DealChat is your correct chat page component
import CreateDeal from './pages/CreateDeal';
import MyDeals from "./pages/MyDeals";
import SellerDashboard from "./pages/SellerDashboard";
import ChatRoom from "./pages/ChatRoom";
import DocumentUploader from "./pages/DocumentUploader";
import DocumentViewer from "./pages/DocumentViewer";
import DealRoom from "./components/DealRoom/DealRoom";
import IncomingDeals from "./pages/IncomingDeals";

const App = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Default Route: Redirect to dashboard if logged in, else to login page */}
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        
        {/* Login and Register Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Route - Protected */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Deal Room - Protected */}
        <Route
          path="/deal/:dealId"
          element={isLoggedIn ? <DealRoom /> : <Navigate to="/login" />}
        />
        
        {/* Specific Deal Chat Route - Protected */}
        <Route
          path="/deal/:dealId/chat"
          element={isLoggedIn ? <ChatRoom /> : <Navigate to="/login" />}
        />
        
        {/* Create Deal Route - Protected */}
        <Route
          path="/create-deal"
          element={isLoggedIn ? <CreateDeal /> : <Navigate to="/login" />}
        />
        
        {/* My Deals Route - Protected */}
        <Route
          path="/dashboard/my-deals"
          element={isLoggedIn ? <MyDeals /> : <Navigate to="/login" />}
        />

        {/*NEW SELLER DASHBOARD ROUTE */}
        <Route
          path="/seller-dashboard"
          element={isLoggedIn ? <SellerDashboard /> : <Navigate to="/login" />}
        />

        {/* NEW INCOMING DEALS PAGE */}
        <Route
          path="/seller-dashboard/incoming-deals"
          element={isLoggedIn ? <IncomingDeals /> : <Navigate to="/login" />}
        />

        <Route path="/upload-docs" element={<DocumentUploader />} />
        <Route path="/view-docs" element={<DocumentViewer />} />

        {/* <Route path="/upload-docs" render={() => <DocumentUploader />} />
        <Route path="/view-docs" render={() => <DocumentViewer />} /> */}

        {/* <Route path="/deal/:dealId/chat" element={<ChatRoom />} /> */}

      </Routes>
    </Router>
  );
};

export default App;






