import { ethers } from 'ethers';
import { action, makeObservable } from 'mobx';
import artifacts from '../../../../artifacts/contracts/ZombieFactory.sol/ZombieFactory.json';
import { ContractStoreBase } from '../ContractBase';

export class ZombieFactory extends ContractStoreBase {
    readonly address = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

    constructor(provider: ethers.providers.Web3Provider) {
        super(provider);
        this.contract = new ethers.Contract(
            this.address,
            artifacts.abi,
            provider
        );
        this.signerContract = new ethers.Contract(
            this.address,
            artifacts.abi,
            provider.getSigner()
        );
        this.contract.on('NewZombie', (z) => {
            console.log('NEW ZOMBIE', z);
        });
        makeObservable(this, {
            createRandomZombie: action,
        });
    }

    createRandomZombie(name: string): void {
        this.signerContract?.createRandomZombie(name);
    }
}
