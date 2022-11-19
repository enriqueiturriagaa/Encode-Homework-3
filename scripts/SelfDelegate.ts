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

  const tokenAddress = "0xa5a442BDe1c8d041780427fbA581dF024ebA99A0"; //TOKEN CONTRACT
  const ballotAddress = "0xE91975D7ca8Df5ca7D503DEFF564566AAb290D49"; //BALLOT CONTRACT

  let tokenContract: MyToken;
  const tokenContractFactory = new MyToken__factory(signer);
  tokenContract = tokenContractFactory.attach(tokenAddress);

  let ballotContract: Ballot;
  const ballotContractFactory = new Ballot__factory(signer);
  ballotContract = ballotContractFactory.attach(ballotAddress);

  const ourAddresses = [
    "0xa77133c0768D11916775F1E743843FECf03D5875", //Enrique
    "0x20b3F4f5A127Cc65CdBD7548E72C0E439D0C5F43", //Mohamad
  ];

  let enriqueTokenBalance = await tokenContract.balanceOf(ourAddresses[0]);
  console.log(
    `Enrique starts with this  ${enriqueTokenBalance} decimals of balance\n`
  );

  let enriqueVotePower = await tokenContract.getVotes(ourAddresses[0]);
  console.log(
    `After the mint Enrique has ${enriqueVotePower} decimals of Vote power\n`
  );
  let mohamadVotePower = await tokenContract.getVotes(ourAddresses[1]);
  console.log(
    `After the mint Mohamad has ${mohamadVotePower} decimals of Vote power\n`
  );

  const delegateTxEnrique = await tokenContract.delegate(ourAddresses[0]);
  await delegateTxEnrique.wait();

  enriqueVotePower = await tokenContract.getVotes(ourAddresses[0]);

  console.log(
    `After the Self Delegation Enrique has ${enriqueVotePower} decimals of Vote power\n`
  );
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
