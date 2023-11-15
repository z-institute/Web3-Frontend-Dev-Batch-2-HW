# 基本觀念

- 區塊鏈中有不同的 [address](./Basic/address.md) 主要分為：
	- Externally owned accounts ( EOAs )：一般用戶私鑰控制的賬戶
	- [contract](./Basic/contract.md)：智能合約地址

# 使用習慣
- state, function 命名是 **camelCase**
	- function private / internal 以 `_` 做開頭，以區分非外部函數
- [library](./Basic/library.md), contract, [event](./Basic/event.md), struct, [enum](./Basic/enum.md), [interface](./Basic/interface.md) 命名是 **PascalCase / UpperCamelCase**
	- library, contract 名稱和檔案名稱一樣 ( 如檔案有多個 contract，則跟核心的 contract 命名一樣 )
- constants 命名是 **CAPITAL_SNAKE_CASE**

# 關鍵字
- Visibility 
	- public ( **function 沒寫的預設** )：可以從合約外部調用，也可以在合約內部調用。這會產生狀態變數的 getter 函數
	- external： 僅從合約外部( EOAs )調用，可以被其他合約和交易調用
	- internal ( **state 沒寫的預設** )：僅在當前合約和派生合約 ( derived contract )中調用
	- private：只能從定義它的當前同一合約中調用
- [State Mutability](./Basic/stateMutability.md)
	- view : function 回傳 state 的值 ( 函數不會修改狀態，但可以從合約儲存中讀取 )
	- pure : function 回傳非 state 的值 ( 除了該函數作用域內的變數之外，不使用其他變數 )
	- [payable](./Basic/receiveEther.md) : 使用該 function [寫入資料](./Basic/transaction.md)到 blockchain ( 寫入 state ) ，且要接收 ether  ( 需要 gas fee )
	- nonPayable : ( **default，不需在 function 中特別寫出來** )  使用該 function [寫入資料](./Basic/transaction.md)到 blockchain ( 寫入 state ) 並讀取該值 ，且不需接收 ether（ 需要 gas fee ）
- [Data Location](./Basic/dataLocation.md)
	- storage : 將資料寫到合約儲存中。這意味著它們被寫入以太坊區塊鏈
		- contract state variable 預設是 storage
	- memory : 只是拿複製資料，不會改變鏈上的資訊，例如：function 執行完 memory variable 就會消失
		- reference types 像是 arrays, structs, mappings, strings 都必須在宣告型別後加
- [Inheritance](./Basic/inheriance.md) ( **大於 0.6.0 版本** )
	- virtual : 代表該 function 可以被 derived contract 覆寫
	- override：derived contract 可以覆寫基礎合約（base contract）的 function
- require : 如果傳遞給 require 的條件為 false，則操作將被恢復，這表示狀態將返回( reverted )到交易之前的狀態，並且任何消耗的 Gas 將不會退還
	```sol
	require(amount <= address(this).balance, "Insufficient balance to withdraw");
	```
# 測試
- `<test_file_name>.test.js` : 實際的測試地方
- `<test_file_name>.behavior.js` : 共用 function 給測試檔案用，通常不會用來跑測試在這檔案中
- 如果使用 hardhat 則：
	- `npx hardhat test` 測試專案下所有測試檔案
	- `npx hardhat test ./<relative_path>/*.js` 測試指定資料夾


