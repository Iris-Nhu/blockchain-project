// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20", // phiên bản Solidity
  networks: {
    // Mạng local (Hardhat node)
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // Mạng testnet Sepolia (Ethereum)
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY] // private key ví của bạn
    }
    // Bạn có thể thêm các mạng khác như Polygon, BSC...
  },
  paths: {
    sources: "./contracts",   // nơi chứa file .sol
    tests: "./test",          // nơi chứa file test
    cache: "./cache",         // cache của Hardhat
    artifacts: "./artifacts"  // nơi build contract
  }
};