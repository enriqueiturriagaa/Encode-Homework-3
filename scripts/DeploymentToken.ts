import { ethers } from "hardhat";
import { Ballot, Ballot__factory, MyToken__factory } from "../typechain-types";
import { tokenizedBallotSol } from "../typechain-types/contracts";
import * as dotenv from "dotenv";
dotenv.config();

const TEST_MINT_VALUE = ethers.utils.parseEther("10");

async function main() {
  const provider = ethers.getDefaultProvider("goerli", {
    alchemy: process.env.ALCHEMY_API_KEY,
  });
  // const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  console.log(`Connected to the account of ${signer.address}
  \nThis account has a balance of ${balanceBN.toString()}} Wei`);

  const contractFactory = new MyToken__factory(signer);
  const tokenContract = await contractFactory.deploy();
  await tokenContract.deployed();
  console.log(`Token contract deployed at ${tokenContract.address}\n`);

  const ourAddresses = [
    "0xa77133c0768D11916775F1E743843FECf03D5875", //Enrique
    "0x20b3F4f5A127Cc65CdBD7548E72C0E439D0C5F43", //Mohamad
    "0x3eD7DA3DCC9A1a1cB73c56a37926F82612D8Ac30", //Ishmeet
    "0x3936332118d2DBd062eE2577F42cd50D9207F76e", //Branlog
    "0xa2d590fee197c0b614fe7c3e10303327f38c0dc3", //ChaIn
    "0xc9Cfa840d1BB8290d0b94d6647008B495Ec77B56", //Kronos
  ];

  const mintTX = await tokenContract.mint(ourAddresses[0], TEST_MINT_VALUE);
  await mintTX.wait();

  let enriqueTokenBalance = await tokenContract.balanceOf(ourAddresses[0]);
  console.log(
    `Enrique starts with this  ${enriqueTokenBalance} decimals of balance\n`
  );
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
