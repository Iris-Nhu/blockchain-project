import express from 'express';
import mongoose from 'mongoose';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

console.log("⏳ Đang khởi động hệ thống...");

// 1. Kết nối MongoDB Atlas (Có thêm timeout để không bị treo)
mongoose.connect("mongodb+srv://an_user:123456An@cluster0.opyvjmu.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster0", {
    serverSelectionTimeoutMS: 5000 // Sau 5 giây không kết nối được sẽ báo lỗi ngay
})
    .then(() => console.log("✅ Đã kết nối MongoDB Atlas thành công!"))
    .catch(err => console.error("❌ Lỗi kết nối MongoDB (Kiểm tra IP trên Atlas):", err.message));

// Schema
const Product = mongoose.model('Product', {
    productId: Number,
    name: String,
    origin: String,
    qualityStandard: String,
    inspectionResult: String,
    blockchainTxHash: String
});

// 2. Kết nối Blockchain Hardhat
// Sử dụng try-catch để báo lỗi nếu Hardhat Node chưa chạy
let contract;
try {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    
    // ĐÚNG: Sử dụng Private Key của Account #0 (mặc định của Hardhat)
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const wallet = new ethers.Wallet(privateKey, provider);
    
    const abi = [
        "function addProduct(uint256 _id, string _name, string _origin, string _standard, string _result) public",
        "function getProductInfo(uint256 _id) public view returns (tuple(uint256 id, string name, string origin, string standard, string result, bool exists))"
    ];

    // ĐỊA CHỈ CONTRACT: Giữ nguyên địa chỉ bạn đã deploy thành công
    const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; 
    
    contract = new ethers.Contract(contractAddress, abi, wallet);
    console.log("✅ Đã kết nối tới Hardhat Blockchain!");
} catch (e) {
    console.error("❌ Lỗi khởi tạo Blockchain:", e.message);
}
// --- API ---

app.post('/api/products/add', async (req, res) => {
    try {
        const data = req.body;
        console.log("📝 Đang ghi Blockchain cho sản phẩm:", data.name);

        const tx = await contract.addProduct(data.productId, data.name, data.origin, data.qualityStandard, data.inspectionResult);
        const receipt = await tx.wait();

        const newProd = new Product({ ...data, blockchainTxHash: receipt.hash });
        await newProd.save();

        console.log("✅ Ghi thành công. TxHash:", receipt.hash);
        res.status(201).json({ message: "Thành công!", txHash: receipt.hash });
    } catch (error) {
        console.error("❌ Lỗi API Add:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Tìm đến API verify và sửa lại dòng gọi Contract
app.get('/api/verify/:id', async (req, res) => {
    try {
        // Chuyển đổi ID từ chuỗi sang số nguyên để Blockchain hiểu đúng
        const productId = parseInt(req.params.id); 
        console.log("🔍 Đang truy vấn Blockchain cho ID:", productId);

        const p = await contract.getProductInfo(productId);
        
        res.json({ 
            status: "Xác thực thành công bởi Blockchain", 
            productDetails: {
                id: p.id.toString(), // Chuyển BigInt về String để hiển thị
                name: p.name,
                origin: p.origin,
                standard: p.standard,
                result: p.result
            }
        });
    } catch (error) {
        console.error("❌ Lỗi truy vấn:", error.message);
        res.status(404).json({ 
            message: "Cảnh báo: Không tìm thấy sản phẩm trên Blockchain!",
            warning: "Đây có thể là hàng giả hoặc chưa được kiểm định." 
        });
    }
});
// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 SERVER ĐANG CHẠY TẠI: http://localhost:${PORT}`);
    console.log(`📌 API thêm sản phẩm: POST http://localhost:${PORT}/api/products/add`);
    console.log(`📌 API kiểm tra: GET http://localhost:${PORT}/api/verify/[ID_SẢN_PHẨM]`);
    console.log("------------------------------------------------------------------\n");
});