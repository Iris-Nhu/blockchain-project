// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Import 3 components con
import CreateProduct from './components/CreateProduct';
import ProductList from './components/ProductList';
import Settings from './components/Settings';

const Dashboard = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  
  // State quản lý Tab đang hiển thị ('create', 'list', 'settings')
  const [activeTab, setActiveTab] = useState('create');

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (!address) navigate('/login');
    setWalletAddress(address);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('walletAddress');
    navigate('/');
  };

  // Hàm render nội dung dựa trên activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateProduct />;
      case 'list':
        return <ProductList />;
      case 'settings':
        return <Settings walletAddress={walletAddress} />;
      default:
        return <CreateProduct />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo-icon">🌿</span>
          <span className="brand-title">AgriManager</span>
        </div>
        
        <ul className="menu-list">
          <li 
            className={`menu-item ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            ➕ Tạo sản phẩm mới
          </li>
          <li 
            className={`menu-item ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            📋 Danh sách sản phẩm
          </li>
          <li 
            className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Cài đặt tài khoản
          </li>
          <li className="menu-item logout" onClick={handleLogout}>
            🚪 Đăng xuất
          </li>
        </ul>

        <div className="user-info">
          <p>Ví đang kết nối:</p>
          <small>{walletAddress ? `${walletAddress.substring(0, 15)}...` : '...'}</small>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <div className="page-header">
          {/* Đổi tiêu đề động theo Tab */}
          <h1 className="page-title">
            {activeTab === 'create' && 'Đăng ký Nông sản'}
            {activeTab === 'list' && 'Quản lý Nông sản'}
            {activeTab === 'settings' && 'Hồ sơ Nhà cung cấp'}
          </h1>
          <div className="wallet-badge">🟢 Connected</div>
        </div>

        {/* Render nội dung tương ứng */}
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;