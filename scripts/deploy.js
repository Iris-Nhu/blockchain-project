const hre = require("hardhat");

async function main() {
  const ProductQuality = await hre.ethers.getContractFactory("ProductQuality");
  const productQuality = await ProductQuality.deploy();

  await productQuality.waitForDeployment();

  const address = await productQuality.getAddress();
  console.log("-----------------------------------------------");
  console.log(`✅ Smart Contract đã triển khai tại: ${address}`);
  console.log("-----------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});