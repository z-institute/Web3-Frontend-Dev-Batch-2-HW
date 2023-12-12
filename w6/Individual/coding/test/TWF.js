const {expect} = require('chai');
const {ethers} = require('hardhat');
const implementationABI = require('./path_to/ImplementationABI.json');

describe('TWF contract tests', function () {
  let implementationContract;
  let owner;
  const proxyAddress = '0x59625Bd797a037c5250578eE013590CFde64f9d6';

  before(async function () {
    [owner] = await ethers.getSigners();
    const proxyContract = await ethers.getContractAt('ERC721Creator', proxyAddress);
    const implementationAddress = await proxyContract.implementation();
    const preContract = new ethers.getContractAt(
      'ERC721CreatorImplementation',
      implementationAddress
    );
    console.log('preContract', preContract);
    implementationContract = new ethers.Contract(implementationAddress, implementationABI, owner);
  });

  describe('Deployment', function () {
    it('Should set the right name', async function () {
      const name = await implementationContract.name();
      expect(name).to.equal('Time of Wonderful Forgetting');
    });

    it('Should set the right symbol', async function () {
      const symbol = await implementationContract.symbol();
      expect(symbol).to.equal('TWF');
    });

    it('Should set the right owner', async function () {
      const contractOwner = await implementationContract.owner();
      expect(contractOwner).to.equal(owner.address);
    });
  });
});
