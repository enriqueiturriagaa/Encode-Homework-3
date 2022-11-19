import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

const TEST_MINT_VALUE = ethers.utils.parseEther("10");

async function main() {
  const accounts = await ethers.getSigners();
  const [minter, voter, other] = accounts;
  const contractFactory = new MyToken__factory(minter);
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`Tokenized voted contract deployed at ${contract.address}\n`);

  let voterTokenBalance = await contract.balanceOf(voter.address);
  console.log(
    `Voter starts with this  ${voterTokenBalance} decimals of balance\n`
  );

  const mintTX = await contract.mint(voter.address, TEST_MINT_VALUE);
  await mintTX.wait();
  voterTokenBalance = await contract.balanceOf(voter.address);
  console.log(
    `After the mint the voter has ${voterTokenBalance} decimals of balance\n`
  );
  let votePower = await contract.getVotes(voter.address);
  console.log(
    `After the mint the voter has ${votePower} decimals of Vote power\n`
  );
  const delegateTx = await contract.connect(voter).delegate(voter.address);
  await delegateTx.wait();
  votePower = await contract.getVotes(voter.address);
  console.log(
    `After the delegation the voter has ${votePower} decimals of Vote power\n`
  );
  const transferTx = await contract
    .connect(voter)
    .transfer(other.address, TEST_MINT_VALUE.div(2));
  await transferTx.wait();
  votePower = await contract.getVotes(voter.address);
  console.log(
    `After the transfer of the votes the voter has ${votePower} decimals of Vote power\n`
  );
  votePower = await contract.getVotes(other.address);
  console.log(
    `After the transfer of the votes the OTHER has ${votePower} decimals of Vote power\n`
  );

  const delegateOtherTx = await contract.connect(other).delegate(other.address);
  await delegateOtherTx.wait();
  votePower = await contract.getVotes(other.address);
  console.log(
    `After the self delegation, the other account has ${votePower} decimals of vote power\n`
  );

  const currentBlock = await ethers.provider.getBlock("latest");
  for (
    let blockNumber = currentBlock.number - 1;
    blockNumber >= 0;
    blockNumber--
  ) {
    const pastVotePower = await contract.getPastVotes(
      voter.address,
      blockNumber
    );
    console.log(
      `At block ${blockNumber}, the voter had ${pastVotePower} decimals of Vote power\n`
    );
  }
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
