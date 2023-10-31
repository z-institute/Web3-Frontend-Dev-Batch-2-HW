# Web3.0入門 - 筆記 & 作業
## Chapter 1 從 Web 2.0 到 Web 3.0
### 第一章節_課後作業
1. 舉一個目前常用，你覺得適合轉型 Web3 的 Web2 應用，並敘述為什麼？
    - 我自己有一項工具的常用 Donate 平台為 [Buy Me a Coffee](https://www.buymeacoffee.com/rchinnn)，這個平台還蠻適合轉型為 Web3 
    - 假設有人因為用了工具想贊助我，但不想建立 Buy Me a Coffee 帳號及輸入信用卡資訊，只要有錢包訪問該 Dapp，就能直接設定要贊助多少幣以及金額，速度會快很多
1. 從課堂中介紹的應用裡挑一個你最喜歡的來試用，提供項目截圖與使用心得
    - [uniswap](https://app.uniswap.org/swap)
        - 項目截圖
            - ![](https://hackmd.io/_uploads/HkTzWF0za.png)
    - 使用心得
        - AMM 提供了更去中心化、開放和具有更多用戶優勢的交易方式，在 DeFi 生態系統的發展扮演重要的角色
1. 列出熟悉的程式語言、開發框架與前端工具，其中是否有 Dapp 的開發範例？
    - 工作上常用的語言是 Vue，似乎比較沒有知名的 Dapp 開發範例，不過有搜尋到一個模板可以嘗試套用開發 [使用 Vue.js 開發以太坊 Dapp](https://medium.com/taipei-ethereum-meetup/%E4%BD%BF%E7%94%A8-vue-js-%E9%96%8B%E7%99%BC%E4%BB%A5%E5%A4%AA%E5%9D%8A-dapp-458790e17160)，也許有空檔的話之後可以試試看用 Vue 開發一個簡易版的 Dapp
1. 本章節的學習心得
    - 平常工作都以 Web2.0 為主，初入 Web3.0 有好多新名詞，還在努力熟悉中！

## Chapter 2 DApp 開發基礎
### 第二章節_課後作業
1. 使用 MetaMask 連接測試網 Ropsten，並操作 Uniswap 買賣幣，並提供完成截圖。
    - 測試網改為連接　SepoliaETH
    - 兌換前截圖
        - ![](https://hackmd.io/_uploads/SJ735OCMa.png)
    - 審查交換
        - ![](https://hackmd.io/_uploads/H1tRcuAfp.png)
    - 確認兌換
        - ![](https://hackmd.io/_uploads/SyHzjOCzp.png)
    - 交換已提交
        - ![](https://hackmd.io/_uploads/B1lEodRfa.png)
1. 承上題，貼上你發送的交易完成紀錄 Etherscan 連結，並簡述交易完成時間與花費。
    - [Transaction Details](https://sepolia.etherscan.io/tx/0xb00ae65b6367cd926a5edabbc71fd08b26b2ac335838b3f85912b21205b648cc)
        - 交易完成時間：(Oct-31-2023 01:03:24 PM +UTC)
        - 花費：0.01 ETH + 0.000203689503259032 ETH + 1.500000024 Gwei
1. 列出你覺得 ethers.js、Web3Modal、web3.js 與 WAGMI 或其他相關函式庫的差別
    - ethers.js 提供了一個簡單且強大的 API，使開發者能夠輕鬆地處理以太坊交易、合約操作和密碼學操作。
    - Web3Modal 提供了一個統一的界面，用戶可以選擇使用 Metamask、Trust Wallet、WalletConnect 等常見的錢包，從而實現更好的用戶體驗。
    - web3.js 在以太坊開發中曾經非常流行，但它的 API 複雜，開發者更喜歡使用 ethers.js 來簡化操作。
    - WAGMI 將我們在 ethers.js 常用到的功能整合進套件中，預設有以下功能
        - Metamask, Walletconnet, Coinbase Wallet 等錢包整合
        - 偵測區塊鏈網路切換
        - 將錢包與合約相關的功能整合進 React hooks 中
1. 本章節的學習心得
    - 在課程開始後有去把 2017 年那時創的錢包盡量去找出來，原來在最一開始入門時是用幣託，記得當時有嘗試挖一些比特幣，可惜裡面完全沒有錢XD
    - 藉由第二章節後已經越來越瞭解 Dapp 與錢包互動的部分了，非常期待下一章節進入 Code 實作的部分！

## Chapter 3 DApp 進階實作
### 3-3 [實作]查詢錢包餘額
- 單元中提供的範例 `const provider = new ethers.providers.Web3Provider(instance);` 會報錯 `export 'ethers'.'providers' (imported as 'ethers') was not found in 'ethers'`
    - 查找發現 v6 版本的 ethers 已經沒有 `ethers.providers`，取代的是`BrowserProvider`，故將 Code 改為`const provider = new ethers.BrowserProvider(instance);` 就能拿到 `provider`
- `const signer = provider.getSigner();` 增加 await `const signer = await provider.getSigner();`，否則 `signer` 會處於 `pending` 狀態
- `ethers.utils.formatEther(balance)` 去除中間的 utils，現在可以直接使用 `ethers.formatEther()` 方法
### 3-4 [實作]使用線上編譯器 Remix 部署智能合約
- 佈署合約截圖
    - ![](https://hackmd.io/_uploads/r1Cs-Lafa.png)
- 佈署後錢包狀態
    - ![](https://hackmd.io/_uploads/BkWgMLaf6.png)
- 測試免手續費 function
    - ![](https://hackmd.io/_uploads/ryLNMUTz6.png)
- 測試 store function, 修改為 hello world
    - ![](https://hackmd.io/_uploads/SyGqzLpGT.png)
- 測試 storePaidMsg function, 修改為 rChin paid
    - ![](https://hackmd.io/_uploads/BJxHmLTGp.png)
- 測試完畢後錢包狀態
    - ![](https://hackmd.io/_uploads/r1-D78Tfa.png)
### 3-5 [實作]與智能合約互動 - 如何讓自己的去中心化應用與智能合約互動？
- 成功使用 js 修改 message 為 "Free fish!" 
    - ![](https://hackmd.io/_uploads/BkVMLLpfa.png)
- `ethers.utils.parseEther` 一樣移除 utils 改為 `ethers.parseEther`
- 成功使用 js 修改 paid message 為 "Paid fish!" 
    - ![](https://hackmd.io/_uploads/ry7y_I6f6.png)
- 測試完畢後錢包狀態
    - ![](https://hackmd.io/_uploads/ryqcc0aM6.jpg)
### 3-6 [實作]跟 React 的結合與狀態管理
- 修改完 App.js 後頁面狀態
    - ![](https://hackmd.io/_uploads/Sk3FEBAzT.jpg)
- 成功使用頁面修改 message 為 "Free fish by react"
    - ![](https://hackmd.io/_uploads/SyBGHSRGp.jpg)
- 成功使用頁面修改 paid message 為 "Paid fish by react"
    - ![](https://hackmd.io/_uploads/rJwcLHAMp.jpg)

### 第三章節_課後作業
1. 部署自己的 DApp 到 Netlify 或任意伺服器上，客製化前端（如加上自己名字）並貼上網址。
    - https://rchin-first-dapp.netlify.app/
1. 可以在手機 Metamask app 上秀給朋友看！(記得加上 responsive UI)
    - ![](https://hackmd.io/_uploads/rJ24OK0G6.jpg)
1. ~~加分題：加其他功能並串接上前端，例如~~
    1. ~~做成留言板~~
    1. ~~把付費訊息置頂，模擬直播主介面~~
    1. ~~做一個點歌機，並讓網頁可即時播放音樂~~
    1. ~~網頁上顯示總智能合約收款金額~~
        - ~~提示：取得 contract address 的 balance~~
    - **加分題先不做**
1. 本章節的學習心得
    - 前面兩個章節都是區塊鍊基本知識，花了蠻多時間去盡量理解，到這個章節實作 Code 後反而感覺上有比較簡單一些！


## Chapter 4 課程總結與下一步
### 第四章節_課後作業
1. 分享你會追蹤哪些區塊鏈媒體與學習管道
    - [李留白](https://hicoldcat.com/categories/)
    - [幣玩Beeone](https://www.youtube.com/@beeone-top3999/videos)
    - 陸續增加中 ...
1. 課程總 Feedback
    - 覺得整組 Web3.0 課程設計得很不錯，對於有基礎的前端工程師來說入門確實非常快，期待後續的直播課程能更加瞭解其他知識！
1. 共花了多久時間完成這堂課？
    - 包含筆記與實作，大約花了 8-9 個小時左右完成
1. 分享你學習時的筆記
    - 實作與作業筆記都先記錄在 [HackMD](https://hackmd.io/W1lO3GfTQbKm9iR97pVmRA) 中
1. 希望我們再補充什麼內容？
    - 對於 Remix 線上合約編譯器想再更深入瞭解