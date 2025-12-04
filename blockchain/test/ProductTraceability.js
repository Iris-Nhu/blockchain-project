// test/ProductTraceability.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductTraceability Contract", function () {
  let ContractFactory, contract, owner, addr1;

  beforeEach(async function () {
    // Lấy danh sách account từ Hardhat
    [owner, addr1] = await ethers.getSigners();

    // Deploy contract mới trước mỗi test
    ContractFactory = await ethers.getContractFactory("ProductTraceability");
    contract = await ContractFactory.deploy();
    await contract.deployed();
  });

  it("should create a product and emit event", async function () {
    // Gọi hàm createProduct
    const tx = await contract.createProduct(
      "Gạo ST25",
      "Sóc Trăng",
      "2025-11-20",
      "2026-05-20",
      "VietGAP",
      "Đạt chuẩn an toàn thực phẩm",
      "Độ ẩm 14%"
    );

    // Kiểm tra event ProductCreated
    await expect(tx)
      .to.emit(contract, "ProductCreated")
      .withArgs(1, owner.address);

    // Lấy dữ liệu sản phẩm vừa tạo
    const product = await contract.getProduct(1);
    expect(product.name).to.equal("Gạo ST25");
    expect(product.origin).to.equal("Sóc Trăng");
    expect(product.producerAddress).to.equal(owner.address);
  });

  it("should allow multiple producers to create products", async function () {
    // Owner tạo sản phẩm
    await contract.createProduct(
      "Xoài Hòa Lộc",
      "Tiền Giang",
      "2025-11-25",
      "2025-12-15",
      "GlobalGAP",
      "Đạt chuẩn xuất khẩu",
      "Trái to, ngọt"
    );

    // addr1 tạo sản phẩm
    await contract.connect(addr1).createProduct(
      "Cà phê Arabica",
      "Đắk Lắk",
      "2025-11-10",
      "2026-05-10",
      "Organic",
      "Đạt chuẩn hữu cơ",
      "Hạt rang vừa"
    );

    // Kiểm tra sản phẩm của addr1
    const product2 = await contract.getProduct(2);
    expect(product2.name).to.equal("Cà phê Arabica");
    expect(product2.origin).to.equal("Đắk Lắk");
    expect(product2.producerAddress).to.equal(addr1.address);
  });
});