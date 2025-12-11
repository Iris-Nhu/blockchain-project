// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import các trang
import Login from './pages/Login/Login';
import Home from './pages/Home/Home'; // Đảm bảo bạn đã tạo file này từ bước trước

// Component giả lập Dashboard (Giữ nguyên để test)
const Dashboard = () => {
  const address = localStorage.getItem('walletAddress');
  return (
    <div style={{ padding: '50px', textAlign: 'center', color: '#2E7D32' }}>
      <h1>Chào mừng Nhà Cung Cấp</h1>
      <p>Đang làm việc với ví: <strong>{address}</strong></p>
      <br />
      <button 
        onClick={() => {
          localStorage.removeItem('walletAddress');
          window.location.href = '/';
        }}
        style={{padding: '10px 20px', cursor: 'pointer'}}
      >
        Đăng xuất
      </button>
    </div>
  );
};

// Component giả lập trang Verify (Để test nút tìm kiếm ở Home)
const VerifyPage = () => {
    return <div style={{textAlign: 'center', marginTop: 50}}>Trang xác thực sản phẩm (Đang phát triển)</div>
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Route trang chủ: Nơi khách hàng tra cứu và xem giới thiệu */}
        <Route path="/" element={<Home />} />

        {/* 2. Route đăng nhập: Dành riêng cho Producer */}
        <Route path="/login" element={<Login />} />
        
        {/* 3. Route Dashboard: Sau khi Login thành công mới vào đây */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 4. Route Verify: Nơi hiển thị kết quả truy xuất (Dành cho Consumer) */}
        <Route path="/verify/:id" element={<VerifyPage />} />

      </Routes>
    </Router>
  );
}

export default App;