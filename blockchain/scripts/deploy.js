// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Đang triển khai contract ProductTraceability...");

  // Lấy contract factory
  const ProductTraceability = await ethers.getContractFactory("ProductTraceability");

  // Triển khai contract
  const productTraceability = await ProductTraceability.deploy();

  // Chờ contract được deploy xong
  await productTraceability.deployed();

  console.log(`✅ Contract ProductTraceability đã được deploy tại địa chỉ: ${productTraceability.address}`);
}

// Thực thi script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deploy thất bại:", error);
    process.exit(1);
  });
