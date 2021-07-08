import { ethers } from "ethers";

export class ContractStoreBase {
    contract: ethers.Contract | null = null;
    signerContract: ethers.Contract | null = null;
    provider: ethers.providers.Web3Provider | null = null;
    constructor(provider: ethers.providers.Web3Provider) {
      this.provider = provider;
    }
}