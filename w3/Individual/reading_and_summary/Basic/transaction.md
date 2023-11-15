# Transaction

- Transactions 源自外部帳戶，交易的目的是修改區塊鏈上的某些狀態，並根據計算和儲存使用來計算消耗的 gas
- transaction function 可以使用 `returns`，但通常不會用來 return 交易後的值，而是使用 events ( EVM 的記錄機制 )
	- 因為 transactions 觸發時機，是根據 gasPrice 去決定執行的優先順序( 以太坊中的交易是異步的 )，而 `returns` 的是立即的查找
