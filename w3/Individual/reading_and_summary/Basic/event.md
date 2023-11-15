# Event

- 事件允許我們記錄有關交易的持久性資料
- event 命名方式是 **UpperCamelCase**，參數可命名也可以不用
	```sol
	event Deployed(address);
	```
- 並在 function 中使用 `emit` 去使用 event


    ```sol
    constructor() {
          emit Deployed(msg.sender);
  }
    ```

- 可以使用 [eth_getLogs](https://www.quicknode.com/docs/ethereum/eth_getLogs) JSON RPC API 取得，去查找交易後發生的事件，其中幾個比較重要的回傳值
	- data : 放進 event 的參數，上面 Deployed event 例子就是 address
	- topics : 事件至少有一個 topic，這一 topic 是事件簽署的哈希值 ( keccak256 hash of the event signature )，上面例子 `Deployed(address)` 的 Keccak-256 雜湊值
		- **補充** : anonymous event 可以沒有 topic
- 我們可以透過新增索引關鍵字 ( indexed ) 來過濾事件參數
	- 此案例會有 4 個 topic
		```solidity
		event Transfer(
			address indexed owner,
			address indexed beneficiary1,
			address indexed beneficiary2,
		)
		```