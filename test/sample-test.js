const { expect, assert } = require("chai");
const hre = require("hardhat");

describe("ERC20Upgrade", function () {
  let accounts;
  let MyERC20;
  let MyERC20V2;
  let v1;
  let v2;

  before(async () => {
    accounts = await ethers.getSigners();
    MyERC20 = await ethers.getContractFactory("MyERC20");
    MyERC20V2 = await ethers.getContractFactory("MyERC20V2");
  });

  it("version() v1", async function () {
    v1 = await hre.upgrades.deployProxy(MyERC20,{kind: 'uups'});
    expect(await v1.version()).to.equal("v1");
  });

  it("transfer() with v1", async function () {
    let amountEther = (amount) => {
      return hre.ethers.utils.parseEther(amount);
    }
    await v1.transfer(accounts[1].address,amountEther("1"));
    const blanceOf = await v1.balanceOf(accounts[0].address);
    expect(ethers.utils.formatEther(blanceOf.toString())).to.equal("9.0");
  })

  it("version() v2", async function () {
    v2 = await hre.upgrades.upgradeProxy(v1,MyERC20V2);
    expect(await v2.version()).to.equal("v2");
  });

  it("balaanceOf() with v2", async function () {
    const blanceOf = await v2.balanceOf(accounts[1].address);
    expect(ethers.utils.formatEther(blanceOf.toString())).to.equal("1.0");
  })
});