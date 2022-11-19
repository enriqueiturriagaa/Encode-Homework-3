// import { ethers } from "hardhat";
// import { MyToken, MyToken__factory } from "../typechain-types";
// import * as dotenv from "dotenv";
// dotenv.config();

// async function main() {
// const provider = ethers.getDefaultProvider("goerli", {
//     infura: process.env.INFURA_API_KEY,
//     etherscan: process.env.ETHERSCAN_API_KEY,
//     alchemy: process.env.ALCHEMY_API_KEY,
//   });
//   // const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
//   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
//   const signer = wallet.connect(provider);
//   const balanceBN = await signer.getBalance();
//   console.log(`Connected to the account of ${signer.address}
//   \nThis account has a balance of ${balanceBN.toString()}} Wei`);

//   const contractAddress = "0xa5a442BDe1c8d041780427fbA581dF024ebA99A0"; // TOKEN CONTRACT

//   let tokenContract: MyToken;
//   const tokenContractFactory = new MyToken__factory(signer);
//   tokenContract = tokenContractFactory.attach(contractAddress);

// //   Instead of tokenContract.mint , I need to transfer tokens to X address...

//   const mintTX = await tokenContract.mint(ourAddresses[1], TEST_MINT_VALUE);
//   await mintTX.wait();
//   const receipt = await mintTX.wait();
//   console.log({ receipt });

//   let mohamadTokenBalance = await tokenContract.balanceOf(ourAddresses[1]);
//   console.log(
//     `Mohamad starts with this  ${mohamadTokenBalance} decimals of balance\n`
//   );

//   let mohamadVotePower = await tokenContract.getVotes(ourAddresses[1]);
//   console.log(
//     `After the mint Mohamad has ${mohamadVotePower} decimals of Vote power\n`
//   );
// }

// main().catch((err) => {
//   console.log(err);
//   process.exitCode = 1;
// });
