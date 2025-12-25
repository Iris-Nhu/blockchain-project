// src/pages/Dashboard/components/CreateProduct.jsx
import React, { useState } from 'react';

const CreateProduct = () => {
  // ... (Copy toàn bộ state và hàm handle từ Dashboard cũ sang đây)
  const [productData, setProductData] = useState({ name: '', origin: '', certificates: [] });
  const standards = ["VietGAP", "GlobalGAP", "Organic"];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đã gửi yêu cầu tạo sản phẩm!");
  };

  // Hàm giả lập checkbox change (copy lại từ code cũ của bạn)
  const handleCheckboxChange = (std) => { /* logic cũ */ };
  const handleInputChange = (e) => { /* logic cũ */ };

  return (
    <div className="form-card">
       {/* Paste toàn bộ thẻ <form> cũ vào đây */}
       <h2 className="section-title">➕ Tạo nông sản mới</h2>
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

  );
};

export default CreateProduct;