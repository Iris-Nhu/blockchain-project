// src/pages/Home/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaSearch, FaRocket, FaShieldAlt, FaHandshake, FaQrcode, FaGlobeAsia } from 'react-icons/fa'; // Import Icon
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
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade-in-up">
          <div className="hero-text-box">
            <span className="badge-tech">
              <span className="badge-dot"></span> ChanNong Solutions
            </span>
            
            <h1 className="hero-title">
              Minh bạch hóa <br />
              <span className="text-gradient">Nông Sản Việt</span>
            </h1>
            
            <p className="hero-desc">
              Hệ thống xác thực chứng chỉ nông nghiệp (VietGAP, OCOP) dựa trên công nghệ <strong>Blockchain</strong>. 
              Bảo vệ uy tín thương hiệu và sức khỏe cộng đồng.
            </p>

            <form className="search-glass-container" onSubmit={handleSearch}>
              <div className="input-group">
                <FaSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Nhập mã sản phẩm (VD: VN-1234)..." 
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-glow">
                Tra cứu ngay
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION SECTION --- */}
      <section id="mission-vision" className="mv-section">
        <div className="container">
          <div className="mv-grid">
            {/* Sứ mệnh */}
            <div className="mv-card mission-card">
              <div className="mv-icon-box">
                <FaRocket />
              </div>
              <div className="mv-content">
                <h3>Sứ mệnh</h3>
                <p>
                  Xây dựng <strong>"Cổng công chứng số"</strong> bất biến. Giải quyết triệt để bài toán làm giả chứng chỉ, khôi phục niềm tin cho nông sản sạch vùng ĐBSCL.
                </p>
              </div>
            </div>

            {/* Tầm nhìn */}
            <div className="mv-card vision-card">
              <div className="mv-icon-box">
                <FaGlobeAsia />
              </div>
              <div className="mv-content">
                <h3>Tầm nhìn</h3>
                <p>
                  Trở thành nền tảng xác thực tiêu chuẩn hàng đầu, đồng hành cùng Hợp tác xã trong công cuộc <strong>Chuyển đổi số</strong> và nâng tầm giá trị nông sản.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
             <h2>Giải pháp công nghệ</h2>
             <div className="header-line"></div>
             <p>Ba trụ cột tạo nên uy tín của ChanNong Solutions</p>
          </div>

          <div className="feature-grid">
             {/* Feature 1 */}
             <div className="feature-card">
               <div className="feature-icon bg-blue">
                 <FaShieldAlt />
               </div>
               <h3>Bảo mật tuyệt đối</h3>
               <p>Dữ liệu chứng chỉ được mã hóa trên Blockchain, ngăn chặn hoàn toàn việc làm giả hoặc sửa đổi trái phép.</p>
             </div>

             {/* Feature 2 */}
             <div className="feature-card">
               <div className="feature-icon bg-green">
                 <FaHandshake />
               </div>
               <h3>Thân thiện Nhà nông</h3>
               <p>Giao diện tối giản, quy trình "No-Code". Nông dân không cần thao tác phức tạp, chỉ cần tập trung sản xuất.</p>
             </div>

             {/* Feature 3 */}
             <div className="feature-card">
               <div className="feature-icon bg-purple">
                 <FaQrcode />
               </div>
               <h3>Truy xuất tức thì</h3>
               <p>Người tiêu dùng quét QR để xem hồ sơ gốc của sản phẩm ngay tại điểm bán. Minh bạch 100%.</p>
             </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;