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
  });

  it('Mint an NFT', async () => {
    await nft.mint(walletTo.address);
    expect(await nft.balanceOf(walletTo.address)).to.eq(1);
  })

  it('check tokenURI', async () => {
    await nft.mint(walletTo.address);
    expect(await nft.tokenURI(0) == "lol0")
  })
/*
  it('Assigns initial balance', async () => {
    expect(await nft.balanceOf(wallet.address)).to.equal(1000);
  });

  it('Transfer adds amount to destination account', async () => {
    await nft.transfer(walletTo.address, 7);
    expect(await nft.balanceOf(walletTo.address)).to.equal(7);
  });

  it('Transfer emits event', async () => {
    await expect(nft.transfer(walletTo.address, 7))
      .to.emit(nft, 'Transfer')
      .withArgs(wallet.address, walletTo.address, 7);
  });

  it('Can not transfer above the amount', async () => {
    await expect(nft.transfer(walletTo.address, 1007)).to.be.reverted;
  });

  it('Can not transfer from empty account', async () => {
    const tokenFromOtherWallet = nft.connect(walletTo);
    await expect(tokenFromOtherWallet.transfer(wallet.address, 1))
      .to.be.reverted;
  });

  it('Calls totalSupply on BasicToken contract', async () => {
    await nft.totalSupply();
    expect('totalSupply').to.be.calledOnContract(nft);
  });

  it('Calls balanceOf with sender address on BasicToken contract', async () => {
    await nft.balanceOf(wallet.address);
    expect('balanceOf').to.be.calledOnContractWith(token, [wallet.address]);
  });
  */
});