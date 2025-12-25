// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductQuality {
    struct Product {
        uint256 id;
        string name;
        string origin;
        string standard;
        string result;
        bool exists;
    }

    mapping(uint256 => Product) public products;

    function addProduct(uint256 _id, string memory _name, string memory _origin, string memory _standard, string memory _result) public {
        products[_id] = Product(_id, _name, _origin, _standard, _result, true);
    }

    function getProductInfo(uint256 _id) public view returns (Product memory) {
        require(products[_id].exists, "San pham khong ton tai");
        return products[_id];
    }
}