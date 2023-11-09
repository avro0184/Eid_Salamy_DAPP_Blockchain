const { ethers } = require("hardhat");

async function main() {
 const EidSalamy = await ethers.getContractFactory("EidSalamy")
 const eidsalamy = await EidSalamy.deploy()
 console.log("Contract deployed to address:", eidsalamy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
