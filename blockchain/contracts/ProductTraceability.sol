// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Product Traceability Smart Contract for AgriChain
/// @notice Lưu trữ dữ liệu sản phẩm nông nghiệp trên blockchain, bất biến và minh bạch
contract ProductTraceability {
    // ---------------------------
    // Cấu trúc & Biến trạng thái
    // ---------------------------

    struct Product {
        uint256 id;                // Mã định danh duy nhất
        string name;               // Tên sản phẩm
        string origin;             // Nơi sản xuất
        string productionDate;     // Ngày sản xuất
        string expiryDate;         // Hạn sử dụng
        string qualityStandard;    // Tiêu chuẩn chất lượng (VietGAP, GlobalGAP...)
        string inspectionResult;   // Kết quả kiểm định
        string notes;              // Ghi chú thêm (có thể cập nhật)
        address producerAddress;   // Địa chỉ ví Producer (msg.sender)
        uint256 createdAt;         // Thời điểm ghi dữ liệu
        bool exists;               // Cờ tồn tại để kiểm tra nhanh
    }

    mapping(uint256 => Product) private products;
    uint256 public nextId = 1;

    // ---------------------------
    // Sự kiện
    // ---------------------------

    event ProductCreated(
        uint256 indexed id,
        address indexed producer,
        string name,
        string origin
    );

    event ProductNotesUpdated(
        uint256 indexed id,
        address indexed producer,
        string notes
    );

    // ---------------------------
    // Modifier tiện ích
    // ---------------------------

    modifier validId(uint256 id) {
        require(id > 0 && id < nextId && products[id].exists, "Invalid product id");
        _;
    }

    modifier onlyProducer(uint256 id) {
        require(msg.sender == products[id].producerAddress, "Not product owner");
        _;
    }

    // ---------------------------
    // Hàm tạo & đọc dữ liệu
    // ---------------------------

    /// @notice Tạo sản phẩm mới
    /// @dev Kiểm tra ràng buộc cơ bản để tránh dữ liệu rác
    function createProduct(
        string memory name,
        string memory origin,
        string memory productionDate,
        string memory expiryDate,
        string memory qualityStandard,
        string memory inspectionResult,
        string memory notes
    ) public {
        require(bytes(name).length > 0, "Product name required");
        require(bytes(origin).length > 0, "Origin required");
        require(bytes(productionDate).length > 0, "Production date required");
        require(bytes(expiryDate).length > 0, "Expiry date required");

        uint256 id = nextId;

        products[id] = Product({
            id: id,
            name: name,
            origin: origin,
            productionDate: productionDate,
            expiryDate: expiryDate,
            qualityStandard: qualityStandard,
            inspectionResult: inspectionResult,
            notes: notes,
            producerAddress: msg.sender,
            createdAt: block.timestamp,
            exists: true
        });

        emit ProductCreated(id, msg.sender, name, origin);

        unchecked {
            nextId = id + 1;
        }
    }

    /// @notice Lấy thông tin sản phẩm theo ID
    function getProduct(uint256 id) public view validId(id) returns (Product memory) {
        return products[id];
    }

    // ---------------------------
    // Hàm cập nhật an toàn
    // ---------------------------

    /// @notice Cập nhật ghi chú sản phẩm (chỉ Producer tạo ra mới được sửa)
    function updateNotes(uint256 id, string memory newNotes)
        public
        validId(id)
        onlyProducer(id)
    {
        products[id].notes = newNotes;
        emit ProductNotesUpdated(id, msg.sender, newNotes);
    }

    // ---------------------------
    // Hàm tiện ích
    // ---------------------------

    /// @notice Kiểm tra nhanh xem product có tồn tại không
    function exists(uint256 id) public view returns (bool) {
        return id > 0 && id < nextId && products[id].exists;
    }

    /// @notice Trả về địa chỉ ví tạo product (hỗ trợ xác minh nhanh)
    function producerOf(uint256 id) public view validId(id) returns (address) {
        return products[id].producerAddress;
    }
}