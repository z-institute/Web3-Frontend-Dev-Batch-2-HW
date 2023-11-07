# Deploy A Token Transfer Page by HardHat
<img width="1138" alt="截圖 2023-11-06 下午10 45 46" src="https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/fcdf838e-5816-444a-961a-5915b71c6baa">

## Pre-requirement
https://github.com/NomicFoundation/hardhat-boilerplate
https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-toolbox

## Step
1. Init Project
```bash
cd hardhat-boilerplate
npm install
```

2. Apply Harhat Connig
- `hardhat.config.js`: apply custom network or fork the mainnet from certain block
```js
    local: {
      url: "http://localhost:8545",
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    hardhat: {
      forking: {
        url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
        blockNumber: 14390000,
      },
```
- Setup Metamask Hardhat Network
  ![image](https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/fcf430e3-1abb-4c70-aa17-43ad5f0dc5c7)


3. Start Local Node
```bash
npx hardhat node
```
- Auto create test wallets, DO NOT use real money on these address due to they are PUBLIC.
- Transaction history will attach on console.
<img width="719" alt="截圖 2023-11-07 上午11 11 36" src="https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/3dae738e-b172-46fa-94fd-683fb14ab989">



4. Deploy contract to local network
```bash
npx hardhat --network localhost run scripts/deploy.js
```

- `deploy.js`: use Token.sol contract artifact to deploy
```
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
```


5. Mint Tokens
```bash
npx hardhat --network localhost faucet <your address>
```
- Should transferred 1 ETH and 100 tokens to Target address


7. Start React Page
```bash
cd frontend
npm install
npm run start
```
- Check [localhost](http://127.0.0.1:3000/) on browser
![image](https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/81a70eb7-29e1-4d6e-9edd-20995c27d68c)
