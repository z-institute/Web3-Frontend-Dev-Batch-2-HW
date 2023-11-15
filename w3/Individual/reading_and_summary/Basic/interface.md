# interface 

- 合約 interface 顯示合約上聲明的 external / public function，但沒有其實作
- 任何實作該 interface 的合約類型，就可以將其轉換成 interface
```sol
interface Token {
    function transfer(address recipient, uint256 amount) external returns (bool);
}
```

```sol
import "./Token.sol";
import "hardhat/console.sol";
contract Example {
    function makeTransfer(address tokenAddress) public {
        Token token = Token(tokenAddress);
        // transfer 100 of the token 
        // from this contract to the msg.sender
        bool success = token.transfer(msg.sender, 100);
        // was the transfer successful?
        console.log(success);
    }
}
```