# W2 作業

## Hardhat Boilerplate Project
https://hardhat.org/tutorial/boilerplate-project#hardhat-boilerplate-project

[截圖1](./image/CleanShot-1.png)
[截圖2](./image/CleanShot-2.png)

此Hardhat程式做了創建一個本地端的區塊鏈接著部署一個代幣的智能合約到本地的這個鏈上，合約初始值擁有1000000枚代號為MHT的幣，
合約之中有一個函式transfer可以讓使用者在鏈上傳送MHT的代幣, 而程式內有另外的功能用於發幣給用戶id的faucet程式
```shell
npx hardhat --network localhost faucet <帳戶接收地址>
```
透過這段程式則可以讓合約發送1ETH與100MHT的代幣給該帳戶，進而讓使用者可以進行測試的行為，