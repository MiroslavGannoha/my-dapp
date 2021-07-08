import { ethers } from "ethers";
import { makeObservable, observable, flow } from "mobx";
import Greeter from "../../../../artifacts/contracts/Greeter.sol/Greeter.json";
import { ContractStoreBase } from "../ContractBase";

export class GreetContract extends ContractStoreBase {
  address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  greeting: string = "";
  constructor(provider: ethers.providers.Web3Provider) {
    super(provider);
    this.contract = new ethers.Contract(this.address, Greeter.abi, provider);
    this.signerContract = new ethers.Contract(
      this.address,
      Greeter.abi,
      provider.getSigner()
    );
    makeObservable(this, {
      greeting: observable,
      setGreet: flow,
      greet: flow,
  })
  }

  *greet() {
    console.log('greet');
    
    this.greeting = yield this.contract?.greet();
  }

  *setGreet(greeting: string) {
    yield this.signerContract?.setGreeting(greeting);
  }
}
