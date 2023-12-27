# Web3 - Educational Platform

# 1. Academia Research Platform

## Business Question:

When graduate students, Ph.D.s, university professors, and scholars want to do research, they are often limited by the source of funds or the shortage of funds, and are unable to achieve in-depth research. Or scholars may write articles quickly before reaching the number of journals published within the period, resulting in a decline in the quality of research. This platform can operate through the Web3 model, allowing scholars to publish articles and obtain funding sources at the same time to solve the above two problems.

## Blueprints:

### Concepts

- Web3 Functions: NFT + Crypto (ERC1155)

  [ERC1155 - OpenZeppelin Docs](https://docs.openzeppelin.com/contracts/3.x/erc1155)

- Roles: Authors, Issuers, Validators, General Users (Scholars)
- Operation Model:

### Crypto Economic Model:

#### Producing/Minting Behaviours

1. Upload Thesis/Dissertations

   - NFT

2. Review articles
3. Journal Issuer

#### Consuming Behaviours

1. Citation
2. Crypto Deflation

<br>

# 2. Student Identity App

## Business Question:

In the UK, higher education students' student ID cards do not show the validity period of their identity, causing them to often face obstacles when proving their identity to businesses. This application combines identity verification (KYC) with Web3 through the blockchain model. All information is encrypted and stored on the blockchain, allowing other student discount applications to obtain consistent and unified information through the blockchain. .

## Blueprints:

- Front End
  - Crypto Wallet
  - QR Code
  - Login Method
- Back End
  - Student Status API (KYC)
    [Student Status | Student Verification API](https://studentstat.us/)
  - QR Code Generator
- Blockchain (EVM)
  - Contract
    - School email variable & setEmail()
    - Expiry Date var. & setExpiryDate()
    - renewStatus()
    - Full Name var. & setName()
    - setAccount()
    - encryptedPSW var.
