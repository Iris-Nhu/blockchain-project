// src/pages/Home/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (productId.trim()) {
      navigate(`/verify/${productId}`);
    }
  };

  return (
    <div className="home-wrapper">
      <Navbar /> {/* Component Navbar */}

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-text">
            <span className="badge">Công nghệ Blockchain 4.0</span>
            <h1 className="hero-title">
              Nông sản sạch <br />
              <span className="highlight">Minh bạch nguồn gốc</span>
            </h1>
            <p className="hero-desc">
              Kiểm tra hành trình từ nông trại đến bàn ăn chỉ với một lần quét. 
              Bảo vệ sức khỏe gia đình bạn với dữ liệu không thể làm giả.
            </p>

            <form className="search-wrapper" onSubmit={handleSearch}>
              <div className="search-input-group">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Nhập mã sản phẩm hoặc quét QR..." 
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-search">Tra cứu</button>
            </form>
          </div>

        </div>
      </section>

      {/* --- FEATURES SECTION (Giữ nguyên hoặc cải tiến) --- */}
      <section id="features" className="features-container">
        <div className="section-header">
           <h2>Tại sao chọn AgriChain?</h2>
           <p>Giải pháp công nghệ tiên phong cho nông nghiệp Việt</p>
        </div>
        <div className="feature-grid">
           <div className="feature-item">
             <div className="icon">🛡️</div>
             <h3>Bảo mật tuyệt đối</h3>
             <p>Dữ liệu được mã hóa và lưu trữ phân tán, không thể bị sửa đổi.</p>
           </div>
           <div className="feature-item">
             <div className="icon">⚡</div>
             <h3>Truy xuất siêu tốc</h3>
             <p>Kết quả hiển thị ngay lập tức với độ chính xác 100%.</p>
           </div>
           <div className="feature-item">
             <div className="icon">📱</div>
             <h3>Dễ dàng sử dụng</h3>
             <p>Giao diện thân thiện, tương thích mọi thiết bị di động.</p>
           </div>
        </div>
      </section>

      <Footer /> {/* Component Footer */}
    </div>
  );
};

export default Home;