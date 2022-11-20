import { ethers } from "hardhat";
import {  MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

// yarn run ts-node --files .\scripts\SelfDelegate.ts <tokenContractAddress> <delegatedAddress>

async function main() {
  const provider = ethers.getDefaultProvider("goerli", {
    infura: process.env.INFURA_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
    alchemy: process.env.ALCHEMY_API_KEY,
  });

  // const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const signer = wallet.connect(provider);

  const balanceBN = await signer.getBalance();
  console.log(`Connected to the account of ${signer.address}\nThis account has a balance of ${balanceBN.toString()}} Wei`);

  const params = process.argv.slice(2);
  if (params.length != 2) throw new Error(`Expected 2 arguments for tokenContractAddress and delegatedAddress but received ${params.length} argument(s) instead.`);
  const tokenContractAddress = params[0];
  const delegatedAddress = params[1];

  const tokenContractFactory = new MyToken__factory(signer);
  const tokenContract = await tokenContractFactory.attach(tokenContractAddress);

  const votesPrior = await tokenContract.getVotes(delegatedAddress);
  console.log(`Prior to delegating, the address ${delegatedAddress} has ${votesPrior} votes.`);

  const delegateTx = await tokenContract.delegate(delegatedAddress);
  await delegateTx.wait();

  const votesAfter = await tokenContract.getVotes(delegatedAddress);
  console.log(`After delegating, the address ${delegatedAddress} has ${votesAfter} votes.`);
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
