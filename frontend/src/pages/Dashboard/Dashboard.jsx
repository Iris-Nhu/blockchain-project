// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  
  // State quản lý dữ liệu form
  const [productData, setProductData] = useState({
    name: '',
    origin: '',
    productionDate: '',
    expiryDate: '',
    description: '',
    certificates: [], // Mảng chứa các chứng nhận được chọn
  });

  // Danh sách các chứng nhận phổ biến
  const standards = ["VietGAP", "GlobalGAP", "Organic", "HACCP", "OCOP 3 Sao", "OCOP 4 Sao"];

  useEffect(() => {
    // 1. Kiểm tra đăng nhập
    const address = localStorage.getItem('walletAddress');
    if (!address) {
      navigate('/login'); // Chưa đăng nhập thì đá về Login
    }
    setWalletAddress(address);
  }, [navigate]);

  // Xử lý thay đổi input text
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Xử lý chọn chứng nhận (Checkbox)
  const handleCheckboxChange = (std) => {
    const { certificates } = productData;
    if (certificates.includes(std)) {
      // Nếu đã chọn thì bỏ chọn
      setProductData({
        ...productData,
        certificates: certificates.filter((c) => c !== std)
      });
    } else {
      // Nếu chưa chọn thì thêm vào
      setProductData({
        ...productData,
        certificates: [...certificates, std]
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('walletAddress');
    navigate('/');
  };

  // Hàm xử lý khi nhấn "Tạo sản phẩm"
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Tại đây sẽ gọi Smart Contract để ghi dữ liệu
    console.log("Dữ liệu chuẩn bị ghi lên Blockchain:", productData);
    alert(`Đã ghi nhận sản phẩm: ${productData.name} với tiêu chuẩn: ${productData.certificates.join(', ')}`);
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
          <li className="menu-item active">➕ Tạo sản phẩm mới</li>
          <li className="menu-item">📋 Danh sách sản phẩm</li>
          <li className="menu-item">⚙️ Cài đặt tài khoản</li>
          <li className="menu-item" onClick={handleLogout} style={{color: 'red'}}>
            🚪 Đăng xuất
          </li>
        </ul>

        <div className="user-info">
          <p>Ví đang kết nối:</p>
          <small title={walletAddress}>
            {walletAddress ? `${walletAddress.substring(0, 15)}...` : '...'}
          </small>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */ }
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Đăng ký Nông sản mới</h1>
          <div className="wallet-badge">
             🟢 Connected
          </div>
        </div>

        {/* Form nhập liệu */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Tên sản phẩm */}
              <div className="form-group">
                <label>Tên sản phẩm nông sản</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-input"
                  placeholder="Nhập tên nông sản"
                  required
                  onChange={handleInputChange}
                />
              </div>

              {/* Nơi sản xuất */}
              <div className="form-group">
                <label>Nơi sản xuất (Trang trại/HTX)</label>
                <input 
                  type="text" 
                  name="origin" 
                  className="form-input"
                  placeholder="Nhập tên Trang trại/Nơi sản xuất"
                  required
                  onChange={handleInputChange}
                />
              </div>

              {/* Ngày sản xuất */}
              <div className="form-group">
                <label>Ngày thu hoạch/Sản xuất</label>
                <input 
                  type="date" 
                  name="productionDate" 
                  className="form-input"
                  required
                  onChange={handleInputChange}
                />
              </div>

              {/* Hạn sử dụng */}
              <div className="form-group">
                <label>Hạn sử dụng</label>
                <input 
                  type="date" 
                  name="expiryDate" 
                  className="form-input"
                  required
                  onChange={handleInputChange}
                />
              </div>

              {/* Chọn tiêu chuẩn (Checkbox) */}
              <div className="form-group full-width">
                <label>Chứng nhận tiêu chuẩn & Chất lượng</label>
                <div className="checkbox-group">
                  {standards.map((std) => (
                    <label key={std} className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value={std}
                        checked={productData.certificates.includes(std)}
                        onChange={() => handleCheckboxChange(std)}
                      />
                      {std}
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload ảnh (Giả lập UI) */}
              <div className="form-group full-width">
                <label>Hình ảnh sản phẩm & Giấy chứng nhận (File đính kèm)</label>
                <input type="file" className="form-input" multiple />
                <small style={{color: '#666', marginTop: '5px', display:'block'}}>
                   *Hệ thống sẽ mã hóa file này và lưu trữ hash lên Blockchain.
                </small>
              </div>

              {/* Ghi chú */}
              <div className="form-group full-width">
                <label>Mô tả chi tiết / Ghi chú thêm</label>
                <textarea 
                  name="description" 
                  className="form-textarea" 
                  rows="4"
                  placeholder="Mô tả về quy trình canh tác, độ ngọt, hướng dẫn bảo quản..."
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn-submit">
              🚀 Ghi dữ liệu lên Blockchain
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;