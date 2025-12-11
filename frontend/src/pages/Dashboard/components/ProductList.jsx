// src/pages/Dashboard/components/ProductList.jsx
import React from 'react';

const ProductList = () => {
  // Dữ liệu giả lập (Sau này sẽ fetch từ Blockchain hoặc API)
  const products = [
    { id: 1, name: 'Gạo ST25 Ông Cua', date: '2025-10-12', status: 'Đã xác thực', qr: 'hash_1' },
    { id: 2, name: 'Xoài Cát Chu Cao Lãnh', date: '2025-10-15', status: 'Đang xử lý', qr: 'hash_2' },
    { id: 3, name: 'Thanh Long Ruột Đỏ', date: '2025-10-20', status: 'Đã xác thực', qr: 'hash_3' },
  ];

  return (
    <div className="form-card">
      <h2 className="section-title">📦 Danh sách sản phẩm đã tạo</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
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
                  <button className="btn-action view">👁️ Xem QR</button>
                  {/* <button className="btn-action delete">🗑️</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;