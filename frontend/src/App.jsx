// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';

// Component giả lập Dashboard (Để test chuyển trang)
const Dashboard = () => {
  const address = localStorage.getItem('walletAddress');
  return (
    <div style={{ padding: '50px', textAlign: 'center', color: '#2E7D32' }}>
      <h1>Chào mừng Nhà Cung Cấp</h1>
      <p>Đang đăng nhập với ví: <strong>{address}</strong></p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route mặc định là trang Login */}
        <Route path="/" element={<Login />} />
        
        {/* Route sau khi đăng nhập thành công */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;