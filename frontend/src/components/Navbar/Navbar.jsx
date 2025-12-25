// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Hiệu ứng đổi màu nền khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">AgriChain</span>
        </Link>

        {/* Menu Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#about" className="nav-links">Giới thiệu</a>
          </li>
          <li className="nav-item">
            <a href="#features" className="nav-links">Tính năng</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-links">Liên hệ</a>
          </li>
        </ul>

        {/* Action Button */}
        <div className="nav-btn">
          <button onClick={() => navigate('/login')} className="btn-primary-outline">
            Dành cho Nhà cung cấp
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;