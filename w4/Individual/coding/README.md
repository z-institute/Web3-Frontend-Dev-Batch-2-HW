# 作業要求
> 照著上課的步驟，從建立Next專案開始，串接任意openSea上的NFT project，並能在前端顯示出鏈上的NFT圖片，亦可透過abi內的function，展示出不同的資訊，最後將步驟、遇到的問題、解法記錄下來。

<img width="592" alt="截圖 2023-11-21 下午5 23 38" src="https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/3a8ec368-49ac-41c1-b4ec-8e94fa9f9a27">

## 專案設置
- 創建新專案
```bash
yarn create next-app
npm install @rainbow-me/rainbowkit wagmi viem
```
創建新專案時，使用了 create next-app 指令，並安裝了 RainbowKit、Wagmi 和 Viem。

## 區塊鏈集成
- RainbowKit 是一個支援多鏈的加密錢包解決方案，為 Web3 應用提供了方便的錢包連接。
``` typescript
import { ConnectButton } from "@rainbow-me/rainbowkit";
<ConnectButton />
```
ConnectButton 是 RainbowKit 提供的 UI 元素，用戶可以通過單擊按鈕來啟用錢包連接。這是一個快速實現錢包連接的方式。

## ERC721 NFT 集成
- 從 basic.json 文件中導入 ERC721 合約 ABI，其中包含了合約的 ABI（應用程序二進制接口），這是與合約進行交互的接口。

```json
"address": "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",

"abi": [...]
```

```typescript
import NFTabi from "@/components/abi/basic.json";
```
這裡使用的 ABI 是 MAYC（Mutant Ape Yacht Club）的 ABI。

## 讀取區塊鏈數據
- Wagmi 是一個 Web3 工具，用於簡化對區塊鏈數據的訪問，使用 Wagmi 的 useContractRead 方法讀取區塊鏈數據，例如獲取特定所有者錢包的代幣餘額。
```Typescript
import { useContractRead } from "wagmi";

const { data, isError, isLoading } = useContractRead({

address: add,

abi: NFTabi.abi,

functionName: "balanceOf",

args: ["0xaBC47FaFbDf313d4A7F9A5BdE21e091E359B1D94"],

});
```
這段代碼中，使用 Wagmi 的 useContractRead 鉤子，通過調用 ERC721 合約的 balanceOf 函數，獲取指定地址的代幣餘額。

## 獲取 NFT 元數據
使用 Viem 和 Axios，發送 HTTP 請求獲取指定 NFT 的元數據，這裡的例子是從 Bored Ape Yacht Club 的 API 中獲取第 15274 號 NFT 的信息。
```typescript
const [NFTData, setNFTData] = useState({} as any);
const getNFTs = async (address?: string) => {

try {
	const res = await axios.get(
	"https://boredapeyachtclub.com/api/mutants/15274"
	);
	setNFTData(res.data);
} 

catch (error) {
	console.error(error);
	setLoading(false);
}
};
```

## 前端 HTML 處理
- 在前端 HTML 中，顯示了 NFT 的圖像和相關信息，並使用 https://ipfs.io/ipfs 作為 IPFS 圖片的前綴。
```html
<div className="h-[394px] w-[394px]">

<img
src="https://ipfs.io/ipfs/Qme4zPRXFHMUn5sTPXANpWoHKxSwMbsUtTLVp3rQQxJfKp"
alt="NFT"
className="h-full w-full object-contain"
/>

</div>

<div className="text-[32px] text-white">{NFTData.name}</div>

<button
onClick={() => getNFTs()}
className="p-10 bg-white text-black rounded-3xl hover:opacity-30 hover:text-white">
```
這段代碼中，顯示了 NFT 的圖像，並使用 NFTData 中的信息更新 UI。同時，通過按鈕點擊觸發 getNFTs 函數，再次獲取 NFT 的信息。
