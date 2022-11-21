import { ethers } from "hardhat";
import { Ballot, Ballot__factory, MyToken__factory } from "../typechain-types";
import { tokenizedBallotSol } from "../typechain-types/contracts";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = ethers.getDefaultProvider("goerli", {
    alchemy: process.env.ALCHEMY_API_KEY,
  });
  // const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  console.log(`Connected to the account of ${signer.address}
  \nThis account has a balance of ${balanceBN.toString()} Wei`);

  const PROPOSALS = ["Proposal1", "Proposal2", "Proposal3"];

  function convertStringArraytoByteArray(array: string[]) {
    const byte32array = [];
    for (let index = 0; index < array.length; index++) {
      byte32array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return byte32array;
  }

  const tokenContractAddress = "0x50ACB8C330aBdB3C733cd4331dd6d44B423CA6e9";

  // const contractFactory = new MyToken__factory(signer);
  // const tokenContract = await contractFactory.deploy();
  // await tokenContract.deployed();
  // console.log(`Token contract deployed at ${tokenContract.address}\n`);

  //  let accounts: SignerWithAddress[];
  //  accounts = await ethers.getSigners();
  const ballotContractFactory = new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.deploy(
    convertStringArraytoByteArray(PROPOSALS),
    tokenContractAddress,
    await provider.getBlockNumber()
  );
  await ballotContract.deployed();

  console.log(`Ballot contract deployed at ${ballotContract.address}\n`);
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
