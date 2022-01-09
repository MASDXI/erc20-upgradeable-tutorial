const hre = require("hardhat");

async function main() {
  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const instance = await hre.upgrades.deployProxy(MyERC20,{kind: 'uups'});
  await instance.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
