import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { makeAutoObservable } from "mobx";

export class App {
    signer: ethers.providers.JsonRpcSigner | null = null;
    provider: ethers.providers.Web3Provider | null = null;
    address: string = "";
    balance: string = '0';
    blocks: number = 0;
    constructor() {
      makeAutoObservable(this);
    }
  
    async connect(): Promise<ethers.providers.Web3Provider> {
      const ethereumProvider: ethers.providers.ExternalProvider =
        await detectEthereumProvider() as ethers.providers.ExternalProvider;
      if (!ethereumProvider || !ethereumProvider.request) {
        throw new Error("Provider not found!");
      }
  
      try {
        await ethereumProvider.request({ method: "eth_requestAccounts" });
      } catch (e) {
        console.warn(e);
      }
      this.provider = new ethers.providers.Web3Provider(ethereumProvider);
      // const provider = new ethers.providers.JsonRpcProvider();
      this.signer = this.provider.getSigner();
      this.address = await this.signer.getAddress();
      console.log(this.address);
      this.balance = await (await this.signer.getBalance()).toString();
      this.blocks = await this.provider.getBlockNumber();
      // const balance = await provider.getBalance("ethers.eth")
      // console.log(balance);
      return this.provider;
    }
  
    get isConnected(): boolean {
      return Boolean(this.provider);
    }
  }
  
export const app = new App();