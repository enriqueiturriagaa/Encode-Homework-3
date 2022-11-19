import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain-types";

describe("Hello World", async () => {
  let helloWorldContract: HelloWorld;
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    signers = await ethers.getSigners();
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");

    const helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.deployed();
  });

  it("Should set owner to deployer account", async () => {
    const signers = await ethers.getSigners();
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.deployed();
    const owner = await helloWorldContract.owner();
    const contractDeployer = signers[0].address;
    expect(owner).to.equal(contractDeployer);
  });

  it("Should change the text", async () => {
    const newText = "New Text";
    const tx = await helloWorldContract.setText("New Text");
    await tx.wait();
    const text = await helloWorldContract.helloWorld();
    expect(text).to.equal(newText);
  });
});
