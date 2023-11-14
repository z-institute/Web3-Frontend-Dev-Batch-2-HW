## 課程完成截圖
![chainshot](chainshot-solidity.png)
![l1](cryptozombies-lesson1.png)
![l2](cryptozombies-lesson2.png)

## Summary
- contract: Solidity 的程式碼都包裹在合約裡面. 一份合约就是以太應幣應用的基本模組， 所有的變數和函數都屬於一份合約, 它是你所有應用程式的起點.
- State variables : 
  - 狀態變數是永久地保存在合約中。也就是說它們被寫入以太幣區塊鏈中. 想像成寫入一個資料庫。
- 常用的資料型別：
  - uint, int, string, 
- 結構體(struct):
  - 若要使用複雜的數據類型，可以使用 struct，範例如下。
 ``` sol 
  struct Person {
  uint age;
  string name;
} 
```
- Arrays: 如果你想建立一個集合，可以用 array 這樣的資料類型. Solidity 支援兩種數組: **fixed** arrays and **dynamic** arrays:
``` solidity
// Array with a fixed length of 2 elements:
uint[2] fixedArray;
// another fixed Array, can contain 5 strings:
string[5] stringArray;
// a dynamic Array - has no fixed size, can keep growing:
uint[] dynamicArray;
```
- 定義函數: 在 solidity 中，定義函數的語法如下：
``` solidity 
function eatHamburgers(string _name, uint _amount) {
}
```
- event : 事件是合約和區塊鏈通訊的一種機制。前端可以應用「監聽」某些事件，並做出反應。範例如下：
```solidity
// 下面建立事件
event IntegersAdded(uint x, uint y, uint result);

function add(uint _x, uint _y) public {
  uint result = _x + _y;
  //觸發事件，通知 app
  IntegersAdded(_x, _y, result);
  return result;
}
```
- Addresses （地址）: 
  - 以太坊區塊鏈由_ account _ (帳戶)組成，你可以把它想像成銀行帳戶。一個帳戶的餘額是_以太_（在以太坊區塊鏈上使用的幣種），你可以和其他帳戶之間支付和接受以太幣，就像你的銀行帳戶可以電匯資金到其他銀行帳戶一樣。
  - 每個帳戶都有一個“地址”，你可以把它想像成銀行帳號。這是帳戶唯一的標識符，它看起來長這樣：
  0x0cE446255506E92DF41614C46F1d6df9Cc969183
- Mapping（映射）:
  - 映射_是另一種在Solidity 中儲存有組織資料的方法。

  - 映射是這樣定義的：
```solidity
// 對於金融應用程式，將用戶的餘額保存在一個 uint 型別的變數中：
mapping (address => uint) public accountBalance;
// 或者可以用來通過 userId 儲存/查找的用戶名
mapping (uint => string) userIdToName;
```
  - 映射本質上是儲存和尋找資料所用的鍵-值對。在第一個例子中，鍵是一個address，值是一個uint，在第二個例子中，鍵是一個uint，值是一個string。

- storage & memory : Storage變數是指永久儲存在區塊鏈中的變數。Memory變數則是暫時的，當外部函數對某合約呼叫完成時，記憶體型變數即被移除。你可以把它想像成儲存在你電腦的硬碟或是RAM中資料的關係。