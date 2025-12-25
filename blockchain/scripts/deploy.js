// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Lấy contract factory từ Hardhat
  const ProductTraceability = await hre.ethers.getContractFactory("ProductTraceability");

  // Triển khai contract
  const productTraceability = await ProductTraceability.deploy();

  // Chờ contract được deploy xong
  await productTraceability.deployed();

  console.log("✅ ProductTraceability contract deployed at:", productTraceability.address);
}

// Thực thi script
main().catch((error) => {
  console.error("❌ Deploy failed:", error);
  process.exitCode = 1;
});
