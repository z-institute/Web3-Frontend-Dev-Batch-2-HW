require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

const INFURA_PROJECT_ID = vars.get('INFURA_PROJECT_ID');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.20',
      },
      {
        version: '0.8.0',
        settings: {},
      },
    ],
  },
  defaultNetwork: 'goerli',
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.SECRET_RECOVERY_PHRASE}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
