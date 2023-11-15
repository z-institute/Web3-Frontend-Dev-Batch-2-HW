# Inheriance

- solidity version 大於 0.0.6 版本
- solidity 可以多重繼承
- Derived 繼承( is )自 Base。這意味著如果您編譯並部署 Derived，它將可以存取 foo() 和 bar() ( 其中 foo() 是使用在 Derived contract 中，覆寫過後的邏輯 )
	- virtual : 代表該 function 可以被 derived contract 複寫
	- override：derived contract 可以複寫基礎合約（base contract）的 function
```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Base {
    // Marking function as 'virtual' allows it to be overridden
    function foo() public pure virtual returns (string memory) {
        return "Base foo";
    }
    
    // Without the 'virtual' keyword, this function cannot be overridden
	function bar() public pure returns (string memory) { 
		return "Base foo"; 
	}
}

contract Derived is Base {
    // Now 'foo' can be overridden because it is marked as 'virtual' in the base contract
    function foo() public pure override returns (string memory) {
        return "Derived foo";
    }
}
```

# Override

- solidity version >=0.6.0;
- 如果 base contract function 可以被 override，則必須有 `virtual` 得字眼，否則不能被 override
- 在 derived contract 的 function 使用 `override`，代表該 function override base contract function

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Base {
    // Marking function as 'virtual' allows it to be overridden
    function foo() public pure virtual returns (string memory) {
        return "Base foo";
    }
}

contract Derived is Base {
    // Now 'foo' can be overridden because it is marked as 'virtual' in the base contract
    function foo() public pure override returns (string memory) {
        return "Derived foo";
    }
}

```