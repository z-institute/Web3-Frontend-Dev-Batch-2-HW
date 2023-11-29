
## Week5 NFT 專案研究
### ERC721 - 單一不可替代代幣
Opensea上常見的NFT標準，可以儲存從圖片到網站各種格式的元數據，假設開發一個數位寵物遊戲，每個寵物都是獨一無二的，擁有自己的外觀和特性。
每個 ERC721 代表一隻寵物，擁有獨一無二的 ID。遊戲中的玩家可以透過 "mint" 函數產生新的寵物，這將創建一個新的 ERC721 代幣。

### ERC1155 - 多類型代幣
https://docs.openzeppelin.com/contracts/3.x/erc1155
假設遊戲有許多不同類型的資產，例如武器、裝備和道具，每種資產可能有多個相同的實例。在這種情況下，使用 ERC1155 可能更為合適。
```solidity
// ERC1155 合約表示遊戲道具
contract GameItems is ERC1155 {
    constructor() ERC1155("https://game-items-api.com/api/items/{id}.json") {}

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public {
        _mint(account, id, amount, data);
    }
}
```

這裡，`GameItems` 合約發行了一種 ERC1155 代幣，每個 ID 代表一種不同的遊戲道具。使用 `mint` 函數，你可以創建多個相同或不同 ID 的代幣，代表遊戲中的不同道具。
總的來說，如果需要管理大量獨特的不可替代資產，則 ERC721 是一個好的選擇；如果你有多種類型的資產，並且這些資產可以有多個相同的實例，那麼 ERC1155 可能更適合。

## CyberBonk
<img width="1298" alt="截圖 2023-11-27 下午1 18 25" src="https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/907b509b-7588-4158-9f4e-f33d107a8371">

### Contract
- 課堂範例的CyberBonk背景圖片為ERC1155標準，MAX_SUPPLY = 1111 代表最大供給量為1000>。
- 透過react計數器達到點擊111下後獲得pwd後呼叫合約`mint` function。
- 方法內會計算是否超過最大供給量、玩家是否已擁有ＮＦＴ以及密碼是否正確。

```solidity
    function mint(string calldata pwd) external {
        uint256 _index = index;
        require(_index < MAX_SUPPLY, "supply limit");
        require(balanceOf(_msgSender(), 0) == 0, "Can only mint one NFT per address");
        require(compare(pwd, "ToBonkOrNotToBonk"), "Password not match");

        // mint
        _mint(_msgSender(), 0, 1, "");

        assembly {
            sstore(add(_owners.slot, _index), caller())
        }

        unchecked {
            _index++;
        }
        index = _index;
    }
```
### React
- 創建一個Hook呼叫Mint NFT，使用wagmi進行合約寫入動作
- 合約地址與通關密碼儲存在constants，方便管理Credential
```typescript
import { useAccount, useContractWrite } from "wagmi";
import { NFTAddress, password } from "../constants";
import NFTAbi from "../abis/NFTAbi.json";

  const { writeAsync, status } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: NFTAddress,
    abi: NFTAbi,
    functionName: "mint",
    args: [password],
  });
```
---
## NameCard
<img width="1449" alt="截圖 2023-11-29 凌晨12 20 04" src="https://github.com/z-institute/Web3-Frontend-Dev-Batch-2-HW/assets/13402112/3403462e-4e99-4e1a-ab37-23219a75fe2d">

https://app.ens.domains/
ENS（以太坊域名服務）是以太坊上的一個系統，允許用戶將易記的域名映射到以太坊地址，取代了較難記的地址串。
跟買Web2 Domain的概念近似，可以透過綁定 ENS 名稱賦予 NFT，創造出 NFT 的 ENS 域名。這種結合使得 NFT 更容易識別，並賦予它們易記的名稱。
有趣的是商業模式跟域名雷同，根據租用不同長度的時間收取gas費用。

特點如下:
- 合併易記名稱和 NFT： 將 ENS 名稱與 NFT 綁定，使得每個 NFT 都擁有一個易於識別的名稱，而不僅僅是一串難記的字符。

- 提高可識別性： 這樣的結合提高了 NFT 的可識別性和可分享性。用戶可以通過 ENS 名稱而非長地址來識別和分享其 NFT。

- 方便用戶操作： 對於非技術用戶來說，這為使用和管理 NFT 提供了更簡便的方式。他們可以使用易記名稱而不必擔心輸入或複製長地址。

### React
- setEnsData()使用提供的 ENS 名稱，通過以太坊提供者（`provider`）獲取相應的解析器（`resolver`），則通過解析器獲取 `email` 等相關數據。
```typescript
async function setEnsData(ensName: string) {
    const resolver = await provider.getResolver(ensName);
    if (!resolver) {
      setRetEnsData({});
      return;
    }
    const email = await resolver.getText("email");
    ...

    setRetEnsData({
      email,
      ...
    });
  }
  return retEnsData;
};
```

- 取得NFT圖片使用opensea api，此範例為v1版本，取出該地址前5個NFT
https://docs.opensea.io/v1.0/reference/getting-assets
```typescript
fetch(
      `https://api.opensea.io/api/v1/assets?owner=${addr}&order_direction=desc&limit=5`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-KEY": "...",
        },
      }
    )
      .then((response) => response.json())
      .then(({ assets }) => {
        console.log(assets);
        setNfts(assets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addr]);
```



- 將ENS解析出的地址上的ＮＦＴ與metadata 資料，填入component渲染出名片網頁
```typescript
const ensData: ensDataType = useEnsData(currentAddr, finalDomainName);

<NFTCard ethAddress={ensData.ethAddress || ""}></NFTCard>
<Card
          cardData={ensData}
          colors={sortedColors}
          cardBgColor={convertColor(imgColor && imgColor[1])}
></Card>
```

