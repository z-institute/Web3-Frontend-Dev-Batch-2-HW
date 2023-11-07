## Trident

### `hardhat.config.js`

    之前是使用getSigner來取得帳戶，namedAccounts可直接定義哪些帳戶的用途是什麼，在開發上會更有幫助。

        ```
        namedAccounts: {
            deployer: {
            default: 0,
            },
            dev: {
            default: 1,
            },
            alice: {
            default: 2,
            },
            bob: {
            default: 3,
            },
            carol: {
            default: 4,
            },
            dave: {
            default: 5,
            },
            eve: {
            default: 6,
            },
            feeTo: {
            default: 7,
            },
            barFeeTo: {
            default: 8,
            },
        },
        ```
