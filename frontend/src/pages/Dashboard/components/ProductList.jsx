// src/pages/Dashboard/components/ProductList.jsx
import React, { useState } from 'react';
import QRModal from './QRModal'; // Import Component vừa tạo

const ProductList = () => {
  // State quản lý sản phẩm đang được chọn để xem QR
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: 'Gạo ST25 Ông Cua', date: '2025-10-12', status: 'Đã xác thực' },
    { id: 2, name: 'Xoài Cát Chu Cao Lãnh', date: '2025-10-15', status: 'Đang xử lý' },
    { id: 3, name: 'Thanh Long Ruột Đỏ', date: '2025-10-20', status: 'Đã xác thực' },
  ];

  return (
    <div className="form-card">
      <h2 className="section-title">Danh sách sản phẩm đã tạo</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Số thứ tự</th>
              <th>Tên sản phẩm</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>#{product.id}</td>
                <td style={{fontWeight: 'bold'}}>{product.name}</td>
                <td>{product.date}</td>
                <td>
                  <span className={`status-badge ${product.status === 'Đã xác thực' ? 'success' : 'pending'}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  {/* Bắt sự kiện click để mở Modal */}
                  <button 
                    className="btn-action view"
                    onClick={() => setSelectedProduct(product)}
                  >
                    QR Code
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hiển thị Modal nếu có sản phẩm được chọn */}
      {selectedProduct && (
        <QRModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default ProductList;