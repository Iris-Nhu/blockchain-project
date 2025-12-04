// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  // State quản lý trạng thái UI
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Hook điều hướng trang
  const navigate = useNavigate();

  // Hàm xử lý chính: Kết nối ví
  const connectWallet = async () => {
    // 1. Reset lỗi cũ và bật loading
    setErrorMessage('');
    setIsConnecting(true);

    // 2. Kiểm tra trình duyệt có cài MetaMask không
    if (!window.ethereum) {
      setErrorMessage('Không tìm thấy MetaMask! Vui lòng cài đặt extension.');
      setIsConnecting(false);
      return;
    }

    try {
      // 3. Khởi tạo Provider (Chuẩn Ethers v6)
      const provider = new ethers.BrowserProvider(window.ethereum);

      // 4. Gửi yêu cầu kết nối tới MetaMask
      const accounts = await provider.send("eth_requestAccounts", []);
      const userAddress = accounts[0];

      console.log("Đã kết nối ví:", userAddress);

      // 5. Lưu tạm địa chỉ vào localStorage (Sau này sẽ dùng Context API tốt hơn)
      localStorage.setItem('walletAddress', userAddress);

      // 6. Chuyển hướng sang trang Dashboard
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      // Xử lý các mã lỗi phổ biến
      if (error.code === 4001) {
        setErrorMessage('Bạn đã từ chối kết nối.');
      } else {
        setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } finally {
      // Tắt loading dù thành công hay thất bại
      setIsConnecting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
            {/* Bạn có thể thay Icon lá cây vào đây */}
            <h1>AgriChain</h1>
            <p>Hệ thống truy xuất nguồn gốc nông sản</p>
        </div>

        <button 
          className="btn-login" 
          onClick={connectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? "Đang kết nối..." : "Đăng nhập bằng MetaMask"}
        </button>

        {errorMessage && (
          <div className="error-box">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;