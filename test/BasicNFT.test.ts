import {expect, use} from 'chai';
import {Contract} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import BasicNFT from '../build/BasicNFT.json';

use(solidity);

describe('BasicToken', () => {
  const [wallet, walletTo] = new MockProvider().getWallets();
  let nft: Contract;

  beforeEach(async () => {
    nft = await deployContract(wallet, BasicNFT);
    await nft.mint(wallet.address);
  });

  it('Mint an NFT', async () => {
    expect(await nft.balanceOf(wallet.address)).to.eq(1);
  })

  it('check tokenURI', async () => {
    expect(await nft.tokenURI(0) == "lol0")
  })

  it('test transfer', async () => {
    await nft.transferFrom(wallet.address, walletTo.address, 0);
    expect(await nft.balanceOf(walletTo.address)).to.eq(1);
  })
});