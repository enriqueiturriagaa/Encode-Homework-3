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

  const tokenAddress = "0x50ACB8C330aBdB3C733cd4331dd6d44B423CA6e9"; //TOKEN CONTRACT
  const ballotAddress = "0xF4a97DAd9a03Fb9791f4e1E7526d8dC4cb56290c"; //BALLOT CONTRACT

  let tokenContract: MyToken;
  const tokenContractFactory = new MyToken__factory(signer);
  tokenContract = tokenContractFactory.attach(tokenAddress);

  let ballotContract: Ballot;
  const ballotContractFactory = new Ballot__factory(signer);
  ballotContract = ballotContractFactory.attach(ballotAddress);

  const ourAddresses = [
    "0xa77133c0768D11916775F1E743843FECf03D5875", //Enrique
  ];

  let enriqueVotePower = await tokenContract.getVotes(ourAddresses[0]);
  console.log(`Before voting ${enriqueVotePower} has decimals of Vote power\n`);

  const voteTx = await ballotContract.vote(
    2,
    await tokenContract.getVotes(ourAddresses[0]),
    { gasLimit: 400000 }
  );

  await voteTx.wait();
  const receiptEnrique = await voteTx.wait();
  console.log(`Enrique transactionHash: ${receiptEnrique.transactionHash}`);

  enriqueVotePower = await tokenContract.getVotes(ourAddresses[0]);
  console.log(`After voting ${enriqueVotePower} has decimals of Vote power\n`);

  // const result = await ballotContract.winnerName();
  // console.log(ethers.utils.parseBytes32String(result));
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
