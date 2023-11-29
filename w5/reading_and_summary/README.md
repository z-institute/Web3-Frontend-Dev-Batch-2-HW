# 專案學習筆記

## 1.  SBF-BONK

### smart contract 筆記

```sol
assembly {
    sstore(add(_owners.slot, _index), caller())
}

unchecked {
    _index++;
}
```

- 這兩個用法是比較底層的程式撰寫，但目的是在確保不會出錯的情況減少 gas fee
- `add(_owners.slot, _index)` 在 _owner ( 是 address[1111] ) 找到 _index 位置上的值，等同 `_owner[_index] = msg.sender` 只是後者是較高階程式操作
  - _owner.slot 是找到 _owner 起始位置的儲存位置
  - `caller()` 是呼叫此 function 的人，跟 msg.sender 相同，只在 assembly 操作底層程式會使用 `caller()`
  - 參考：
    - [Advance Solidity Assembly: Storage Slots Part 1](https://dev.to/web3_ruud/advance-soliditymastering-storage-slot-c38)
    - [Advance Solidity Assembly: Storage Slots Part 2](https://dev.to/web3_ruud/advance-solidity-assembly-storage-slots-part-2-197e)
- `unchecked` 是不去檢查 `_index++` 的運算不會溢位 

  ```sol
  function mint(string calldata pwd) external {
    ...
  }
  ```

- calldata : 它與 memory 類似，都是儲存資料的暫存位置，但與 memory 不同的是，您無法修改 calldata。它是唯讀的，用於將資料從外部呼叫者傳遞到函數，`calldata` 是一個更便宜的 data loaction 就 gas costs 而言

### wagmi 筆記

- useContractWrite 會傳的 write 和 writeAsync 差別在，前者適合想要簡單的方法來寫入區塊鏈，而不需要詳細處理交易生命週期，後者更精細地管理事務狀態。

  ```js
  // 利用以下方式來等待，寫入合約的結果，並使用 IsLoadding state 讓前端畫面顯示在等待結果
  setIsLoading(true);
  let writeAsyncTx = await writeAsync?.();
  await writeAsyncTx?.wait();
  setIsLoading(false);
  ```

- wagmi 提供 [TypeScript](https://wagmi.sh/react/typescript)，讓使用 useContractRead, useContractWrite 等 hooks 可以更明確的話是可以掉用的 function，只要用 const assert 的方式

  ```js
  const abi = […] as const // <--- const assertion ( [...] is your abi json )
  const { data } = useContractRead({ abi })
  ```


## 2. Web3 名片

## 其他研究

- 適合開發 NFT 的 ERC 比較：
  - ERC721:比較適用於每個藝術品數量只有一個可以被購買
  - ERC1155:結合了 **ERC721**(適用於 Non Fungible Token) 和 **ERC20** (適用於 Fungible Token)，在 NFT 部分比較適合每個藝術品可以有同一個(同 ERC721 )或多個數量被購買，例如：在遊戲中，提供遊戲代幣(No Fungible Token)，用來購買武器，而可能武器 a 數量只有一個(同 ERC721)，武器 b 數量有很多個可以被購買