// src/pages/Dashboard/components/Settings.jsx
import React from 'react';

const Settings = ({ walletAddress }) => {
  return (
    <div className="form-card">
      <h2 className="section-title">⚙️ Cài đặt tài khoản</h2>
      
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Địa chỉ ví kết nối</label>
          <div className="wallet-display">
            {walletAddress || "Chưa kết nối"}
          </div>
          <small>Đây là định danh duy nhất của bạn trên Blockchain.</small>
        </div>

        <div className="form-group">
          <label>Tên Doanh nghiệp / Hợp tác xã</label>
          <input type="text" className="form-input" defaultValue="HTX Nông nghiệp Xanh" />
        </div>

        <div className="form-group">
          <label>Email liên hệ</label>
          <input type="email" className="form-input" defaultValue="contact@agri.vn" />
        </div>

        <div className="form-group full-width">
          <label>Địa chỉ trang trại</label>
          <input type="text" className="form-input" defaultValue="Thới Lai, Cần Thơ" />
        </div>
      </div>

      <button className="btn-submit" style={{width: 'auto', marginTop: '20px'}}>
        💾 Lưu thay đổi
      </button>
    </div>
  );
};

export default Settings;