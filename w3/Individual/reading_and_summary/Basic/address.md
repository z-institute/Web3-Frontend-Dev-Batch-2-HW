# address
## message 相關全域變數


- msg.data ( bytes ) : 完整的數據 ( calldata : 用於將訊息傳遞到 EVM )
- msg.sender ( address ) : 發送訊息的地址
- msg.sig ( bytes4 ) : 目標函式簽名( signature )
- msg.value ( uint ) : 發送的 wei 數量

## address 種類
- 區塊鏈中有不同的 address 主要分為
  - Externally owned accounts ( EOAs )：這是由私鑰控制的賬戶，通常用於存儲資金，發送交易，並與智能合約互動。它們是區塊鏈使用者的個人賬戶
  - contract ：即為定義智能合約的邏輯，這些賬戶包含智能合約的代碼。它們不由私鑰控制，而是由部署它們的代碼和條件控制。當滿足特定條件時，合約賬戶可以自動執行操作
    - contract function 執行始終需要從外部呼叫者( EOAs )開始。合約只會放在區塊鏈上，什麼都不做，直到有人呼叫它的某個函數，可利用 **message 相關全域變數** 取讀呼叫者資訊
- address 和 address payable ，差別在 address payable 多了 `transfer` 和 `send` 兩種 function
	- 讓程式碼更加明確並防止意外誤用。透過使用 address payable，開發人員表明該地址在處理以太幣交易
	- `transfer` 和 `send` 差別在使用 `send` fuction 時失敗不會拋出錯誤
		```sol
		contract PaymentExample {
			function sendEther(address payable recipient)external payable{
				recipient.transfer(msg.value);
		  
				bool success = recipient.send(msg.value);
				require(success, "Failed to send Ether using send");
			}
		}
		```
	- 此篇 [文章](https://solidity-by-example.org/sending-ether/) 建議使用 call 取代 `send` 和 `transfer` ( 三種用法都是 recipient 收到 msg.sender 的 msg.value ) ( [原因](https://consensys.io/diligence/blog/2019/09/stop-using-soliditys-transfer-now/) )
		```sol
		import "hardhat/console.sol";
		
		contract Contract {
		    address public recipient;
		    constructor(address _recipient) {
		        recipient = _recipient;
		    }
		
		    function payA() public payable {
		        // forwards all remaining gas along 
		        (bool success, ) = recipient.call{ value: msg.value }("");
		        
		        // should always handle the failure case here 
		        // compiler will warn if you do not define this success bool
		        console.log(success); // true for success, false for failure
		    }
		}
		```
- address 和 address payable 型別轉換
	```sol
	contract Example {
	    address payable a;
	    address b;
	    address payable c;
	
	    constructor(
	        address payable _a, 
	        address payable _b, 
	        address _c
	    ) {
	        a = _a; // store payable in payable
	        b = _b; // implicit conversion to nonpayable
	        c = payable(_c); // explicit conversion to payable
	    } 
	}
	```