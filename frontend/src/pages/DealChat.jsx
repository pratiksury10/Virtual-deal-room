// // src/pages/DealChat.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const DealChat = () => {
//   const navigate = useNavigate();

//   const role = localStorage.getItem('role');
//   const email = localStorage.getItem('email');

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <div style={{ padding: '40px', textAlign: 'center' }}>
//       <h2>Dashboard</h2>
//       <p>Logged in as: <strong>{email}</strong></p>
//       <h3>Welcome, {role === 'buyer' ? 'Buyer' : 'Seller'}!</h3>

//       {/* Buyer specific content */}
//       {role === 'buyer' && (
//         <div>
//           <p>Start browsing seller deals</p>
//           {/* TODO: Deal list for buyers */}
//         </div>
//       )}

//       {/* Seller specific content */}
//       {role === 'seller' && (
//         <div>
//           <p>Manage your deals here</p>
//           {/* TODO: Deal list for sellers */}
//         </div>
//       )}

//       <button onClick={handleLogout} style={{ marginTop: '20px' }}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default DealChat;
