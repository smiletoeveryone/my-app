import React from "react";
import { ethers } from "ethers";
import MetalionABI from "../contracts/MetalionABI.json";
import { useWeb3Context } from "../context/Web3Context";
import { Button, Heading, Text } from "@chakra-ui/react";
import TestnetQubicMint from "./TestnetQubicMint";

export default function MintComponent() {
  const {
    address: _address,
    web3Provider,
    network: _network,
  } = useWeb3Context();
  const contractAddress = "0x0EC6a1578b73E6a562c471C0a33944cBaB8A431f";
  const contractABI = MetalionABI.abi;

  async function handleMint() {
    const signer = web3Provider?.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      if (_address) {
        const response = await contract.mint(_address, {
          value: ethers.utils.parseEther("0.1"),
        });
        console.log("response", response);
      }
    } catch (e) {
      console.log("Error Caught in Catch Statement: ", e);
    }
  }
  return (
    <>
      <Heading>Regular Mint</Heading>
      <Text>
        <b>Wallet Address:</b> <br /> {_address}
      </Text>
      <Text>
        <b>Network:</b> <br />
        {_network?.chainId}
      </Text>
      <Button mt="10px" colorScheme="purple" onClick={handleMint}>
        Mint Metalion
      </Button>

      <TestnetQubicMint />
    </>
  );
}
