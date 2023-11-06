# Implementation hardhat-boilerplate

![Token transfer](./token-transfer.png)

1.  進入 hardhat-boilerplate 並安裝

    ```
    cd hardhat-boilerplate
    npm install
    ```

2.  啟動 local network

    ```
    npx hardhat node
    ```

3.  部署合約到已啟動的 local network

    ```
    npx hardhat --network localhost run scripts/deploy.js
    ```

    `scripts/deploy.js`

    - Line 17: 命名第一個 signer 為 deployer

    - Line 25: getContractFactory 去讀取 contracts 底下 "Token" 合約

    - Line 26: 取得合約名稱 Token 的 factory 對象後，這個對象使用 deploy 方法(可傳入初始化合約參數)產生部署對象

    - Line 27: Token 部署對象使用 deployed 進行部署

    - Line 35: saveFrontendFiles 用來產生合約地址和 ABI 檔案

4.  進 frontend 並安裝，啟動前端介面

    ```
    cd frontend
    npm install
    npm run start
    ```

5.  打開 http://127.0.0.1:3000/
    ![frontend-connect-wallet](./images/frontend-connect-wallet.png)

6.  設定 localhost:8545 network
    ![](./images/local-network-setting.png)

7.  連接錢包
    ![](./images/connect-wallet.png)

    `Dapp.js`

    - Line 174: 打開 MetaMask 授權 Acounts 畫面

    - Line 179: 檢查對應網路

    - Line 183: 初始化錢包資訊

    - Line 186: 監聽 accounte 改變，重新初始化錢包資訊

8.  輸入指令領取測試幣

    ```
    npx hardhat --network localhost faucet 0xa7dcecb9d2bcd04ecc0cbf3e2c09a62273fb3261
    ```

    ![](./images/faucet.png)

9.
