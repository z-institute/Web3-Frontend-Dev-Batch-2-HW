# Library
## 基本介紹
- 跟 contract 類似，最主要的差別在
	- library 沒有狀態
	- 不能具有接收或發送 Ether 的功能 ( 不能在包含像 payable 之類的函數 )
	- 不能繼承或被繼承其他合約
	- 沒有自毀機制 ( self-destructed )
- UIntFunctions.sol
	```sol
	pragma solidity ^0.8.4;

	library UIntFunctions {
	    function isEven(uint _a) public pure returns(bool){
	        return _a % 2 == 0;
	    }
	}
	```
## 調用 library function
- 使用 `internal` library function，在 contract 中：
	- 函數內的程式碼將在編譯期間複製到合約本身，意味著 library 的 `internal` function 成為合約位元組碼的一部分，這類似於直接在 contract 中寫該 function
- 使用 `external` / `public` library function，在 contract 中：
	-  library 必須部署到自己的地址
	- 使用該庫的合約將連結到該庫地址。這個連結過程是在編譯時完成的
	- 在運行時，當合約從庫中呼叫外部或公共函數時，它會使用 DELEGATECALL 來執行此操作。 DELEGATECALL 是一種低階以太坊虛擬機 (EVM) 操作碼，可讓合約執行另一個合約的程式碼
- `private` library function 只能在 library 中使用

## 在 contract 中調用 library
- 直接使用
	```sol
	pragma solidity ^0.8.4;
	
	import "./UIntFunctions.sol";
	
	contract Game {
	    uint public participants;
	    bool public allowTeams;
	
	    constructor(uint _participants){
	        if (UIntFunctions.isEven(_participants)) {
	            allowTeams = true;
	        }
	        participants = _participants;
	    }
	}
	```
- `using` 關鍵字用於將函式庫函數套用到 uint 資料型別，這意味著 UIntFunctions 庫中定義的所有函數現在都可以在範例合約中的任何 uint 變數上調用
	```sol
	pragma solidity ^0.8.4;
	
	import "./UIntFunctions.sol";
	
	contract Game {
	    using UIntFunctions for uint;
	    uint public participants;
	    bool public allowTeams;
	
	    constructor(uint _participants){
	        if (_participants.isEven()) {
	            allowTeams = true;
	        }
	        participants = _participants;
	    }
	}
	```