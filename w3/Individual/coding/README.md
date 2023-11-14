## ChainShot
![螢幕擷取畫面 2023-11-14 224158](https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/a327ceef-6e71-46bc-bd63-e3e65a878834)

## CryptoZombies
![image](https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/82bed6ec-ddff-4980-b74c-5a66c8552b49)
![image](https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/e019e6f3-3368-40dd-ae6f-9b511aa8b5f5)



- 函數調用：
在範例中，透過 ZombieFactory.createRandomZombie(name) 函數創建一個新的僵屍。這個函數的作用是創建一個具有隨機屬性的僵屍。

- 事件監聽：
透過 ZombieFactory.NewZombie 事件來監聽合約中僵屍的創建。當新的僵屍被創建時，事件會被觸發，並執行 generateZombie 函數來更新使用者界面。

- 數據處理：
generateZombie 函數負責處理合約返回的 DNA 數據。通過對 DNA 的解析，從中獲取不同的屬性，例如頭部、眼睛、衣服的選擇，以及顏色的選擇。這些屬性會被用來生成僵屍的詳細信息。

- Solidity 函數類型：
合約中的函數包括 Internal 和 External 函數。Internal 函數僅可在合約內部調用，而 External 函數可以被外部實體（包括其他合約）調用。

- 事件的作用：
事件用於通知外部世界合約的重要行為。在這個例子中，NewZombie 事件通知外部應用程序有新的僵屍被創建。

- 變數存取位置：
Solidity 中的變數存儲位置主要有 storage 和 memory 兩種。storage 用於永久存儲，而 memory 則用於臨時變數和數據。

-隨機數生成：
合約中可能使用了某種形式的隨機數生成，這是為了使每個創建的僵屍具有不同的特徵，增加遊戲的趣味性。
總的來說，這個合約是一個簡單的 CryptoZombie 遊戲合約，通過 Web3.js 與前端互動。合約定義了創建僵屍的函數、事件來通知外部應用程序，以及一些處理僵屍屬性的邏輯。

