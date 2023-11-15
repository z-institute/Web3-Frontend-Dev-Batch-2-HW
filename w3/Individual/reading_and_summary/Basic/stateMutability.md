# State Mutability

- 不會修改到區塊鏈上的狀態( read-only )，所以不會消耗到 gas
- 當 function 有使用到 `view` 或是 `pure` 
	- view : function 回傳 state 的值 ( 函數不會修改狀態，但可以從合約儲存中讀取 )

		```solidity
		contract Contract {
			uint _myNum; 
			
			function myNum() public view returns(uint) { 
				return _myNum; 
			} 
		}
		```
	- pure : function 回傳非 state 的值 ( 除了該函數作用域內的變數之外，不使用其他變數 )

		```solidity
		contract Contract{
		
			function add(uint a, uint b) public pure returns (uint) { 
				return a + b; 
			}
		}
		```

		```solidity
		contract Contract{
		
			function add(uint a, uint b) public pure returns (uint sum) { 
				sum = a + b; 
			}
		}
		```
	- payable : 使用該 function 寫入資料到 blockchain要接收 ether 並 ( 需要 gas fee )

		```sol
		contract Contract {  
			uint balance = 0;
		  
			function deposit () payable public{  
				balance += msg.value;  
			} 
		}
		```
	- nonPayable : ( **default，不需在 function 中特別寫出來** ) 使用該 function 寫入資料到 blockchain 不需接收 ether（ 需要 gas fee ）
		```sol
		contract Contract {  
			state_.function increment() public returns(uint){  
				count += 1;  
				return count;    
			}
		}
		```
