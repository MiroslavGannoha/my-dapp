import { ethers } from 'ethers';
import { makeObservable, observable, flow, action } from 'mobx';
import Greeter from '../../../../artifacts/contracts/Greeter.sol/Greeter.json';
import { ContractStoreBase } from '../ContractBase';

export class GreetContract extends ContractStoreBase {
    address = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9';
    greeting = '';
    constructor(provider: ethers.providers.Web3Provider) {
        super(provider);
        this.contract = new ethers.Contract(
            this.address,
            Greeter.abi,
            provider
        );
        this.signerContract = new ethers.Contract(
            this.address,
            Greeter.abi,
            provider.getSigner()
        );
        makeObservable(this, {
            greeting: observable,
            setGreet: action,
            greet: flow,
        });
    }

    *greet(): Generator<void, void, string> {
        this.greeting = yield this.contract?.greet();
    }

    setGreet(greeting: string): void {
        this.signerContract?.setGreeting(greeting);
    }
}
