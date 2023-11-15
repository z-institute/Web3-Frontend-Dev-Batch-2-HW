# Recieve Ether
## 名詞介紹
- `payable`：代表可以接收 ether ^5023f1
- `receive() external payable` 為特別的 function，當合約在沒有任何資料( calldata ) 的情況下接受以太幣時運行
	- external 代表該函數只能從 externally owned accounts ( EOA ) 調用
	- **注意** : `receive() external payable` 為固定用法 ，`external` 和 `payable` 不可變動
		```sol
		import "hardhat/console.sol";
		
		contract Contract {
		    receive() external payable {
		        console.log(msg.value); // 100000
		    }
		}
		```
- fallback function : 如果合約不知道如何回應發送給它的數據( 處理函數簽名錯誤 - function signature mistake )，它將呼叫 fallback function
	- **補充** : 
		1. [Sending Ether (transfer, send, call)](https://solidity-by-example.org/sending-ether/)
		2.  [fallback](https://solidity-by-example.org/fallback/)
		```sol
		contract Contract {
		    fallback() external payable {
		        // do something
		    }
		}
		```