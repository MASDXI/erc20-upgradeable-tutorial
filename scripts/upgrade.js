const hre = require("hardhat");

async function main() {
  const MyERC20V1 = await ethers.getContractFactory("MyERC20");
  const MyERC20V2 = await ethers.getContractFactory("MyERC20V2");
  const instance = await hre.upgrades.deployProxy(MyERC20V1,{kind: 'uups'});
  await instance.deployed();
  await hre.upgrades.upgradeProxy(instance,MyERC20V2);
  
  console.log(instance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
