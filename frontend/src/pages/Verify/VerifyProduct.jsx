// src/pages/Verify/VerifyProduct.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'; // Tái sử dụng Navbar
import Footer from '../../components/Footer/Footer'; // Tái sử dụng Footer

const VerifyProduct = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      
      <div style={{ flex: 1, padding: '50px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
            backgroundColor: 'white', 
            padding: '40px', 
            borderRadius: '16px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center'
        }}>
            <h2 style={{ color: '#2E7D32', marginBottom: '20px' }}>Kết quả truy xuất</h2>
            <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                Mã sản phẩm: <strong>{id}</strong>
            </div>
            <p style={{ color: '#666' }}>
                Đang kết nối Blockchain để lấy dữ liệu...
            </p>
            {/* Sau này ta sẽ gọi Smart Contract ở đây để hiển thị thông tin thật */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VerifyProduct;