## [Chain shot](https://www.chainshot.com/learn/solidity)

![Chain shot](./screenshots/learn-solidity.PNG)

## [Crypto zombies](https://cryptozombies.io/en/course)

![](./screenshots/Lesson%201%20Making%20the%20Zombie%20Factory.png)

`Array`:

宣告方式分為固定長度和動態長度，ex: type[length]

```
    // Array with a fixed length of 2 elements:
    uint[2] fixedArray;

    // another fixed Array, can contain 5 strings:
    string[5] stringArray;

    // a dynamic Array - has no fixed size, can keep growing:
    uint[] dynamicArray;

```

`底線命名`

- 函式參數命名通常會在開頭加\_，區分全域變數
- 命名私有函式會在開頭加\_

`產生隨機數`

```
//6e91ec6b618bb462a4a6ee5aa2cb0e9cf30f7a052bb467b0ba58b8748c00d2e5
keccak256(abi.encodePacked("aaaab"));

//b1f078126895a1424524de5321b339ab00408010b7cf0e6ed451514981e58aa9
keccak256(abi.encodePacked("aaaac"));
```

`改變格式`

```
uint8 a = 5;
uint b = 6;

// throws an error because a * b returns a uint, not uint8:
uint8 c = a * b;

// we have to typecast b as a uint8 to make it work:
uint8 c = a * uint8(b);
```
