import { ethers } from "ethers";
import { makeAutoObservable } from "mobx";
import Greeter from "../../../../artifacts/contracts/Greeter.sol/Greeter.json";
import { ContractStoreBase } from "../ContractBase";

export class ZombieFactory extends ContractStoreBase {
    readonly address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

    constructor(provider: ethers.providers.Web3Provider) {
      super(provider);
      this.contract = new ethers.Contract(this.address, Greeter.abi, provider);
      this.signerContract = new ethers.Contract(
        this.address,
        Greeter.abi,
        provider.getSigner()
      );
      this.contract.on('NewZombie', (z) => {
        console.log('NEW ZOMBIE', z);
      })
      makeAutoObservable(this);
    }
  
    *createRandomZombie(name: string) {
      this.signerContract?.createRandomZombie(name);
    }
  }