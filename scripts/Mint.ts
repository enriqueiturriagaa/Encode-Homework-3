import { ethers } from "hardhat";
import {
  Ballot,
  Ballot__factory,
  MyToken,
  MyToken__factory,
} from "../typechain-types";
import { tokenizedBallotSol } from "../typechain-types/contracts";
import * as dotenv from "dotenv";
dotenv.config();

const TEST_MINT_VALUE = ethers.utils.parseEther("10");

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
  console.log(`Connected to the account of ${signer.address}
  \nThis account has a balance of ${balanceBN.toString()}} Wei`);

  const contractAddress = "0xa5a442BDe1c8d041780427fbA581dF024ebA99A0"; //TOKEN CONTRACT

  let tokenContract: MyToken;
  const tokenContractFactory = new MyToken__factory(signer);
  tokenContract = tokenContractFactory.attach(contractAddress);

  const ourAddresses = [
    "0xa77133c0768D11916775F1E743843FECf03D5875", //Enrique
    "0x20b3F4f5A127Cc65CdBD7548E72C0E439D0C5F43", //Mohamad
    "0x3eD7DA3DCC9A1a1cB73c56a37926F82612D8Ac30", //Ishmeet
    "0x3936332118d2DBd062eE2577F42cd50D9207F76e", //Branlog
    "0xa2d590fee197c0b614fe7c3e10303327f38c0dc3", //ChaIn
    "0x4Aa40754eA12c2F95b35DBA818D556449228C2B7", //Kronos
  ];

  const mintTXforMohamed = await tokenContract.mint(
    ourAddresses[1],
    TEST_MINT_VALUE,
    { gasLimit: 400000 }
  );
  await mintTXforMohamed.wait();
  const receiptMohamed = await mintTXforMohamed.wait();
  console.log(`Mohamed transactionHash: ${receiptMohamed.transactionHash}`);

  const mintTXforIshmeet = await tokenContract.mint(
    ourAddresses[2],
    TEST_MINT_VALUE,
    { gasLimit: 400000 }
  );
  await mintTXforIshmeet.wait();
  const receiptIshmeet = await mintTXforIshmeet.wait();
  console.log(`Ishmeet transactionHash: ${receiptIshmeet.transactionHash}`);

  const mintTXforBranlog = await tokenContract.mint(
    ourAddresses[3],
    TEST_MINT_VALUE,
    { gasLimit: 400000 }
  );
  await mintTXforBranlog.wait();
  const receiptBranlog = await mintTXforBranlog.wait();
  console.log(`Branlog transactionHash: ${receiptBranlog.transactionHash}`);

  const mintTXforChaIn = await tokenContract.mint(
    ourAddresses[4],
    TEST_MINT_VALUE,
    { gasLimit: 400000 }
  );
  await mintTXforChaIn.wait();
  const receiptChaIn = await mintTXforChaIn.wait();
  console.log(`ChaIn transactionHash: ${receiptChaIn.transactionHash}`);

  const mintTXforKronos = await tokenContract.mint(
    ourAddresses[5],
    TEST_MINT_VALUE,
    { gasLimit: 400000 }
  );
  await mintTXforKronos.wait();
  const receiptKronos = await mintTXforKronos.wait();
  console.log(`Kronos transactionHash: ${receiptKronos.transactionHash}`);
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
