import { ethers } from 'ethers';
import { action, makeObservable } from 'mobx';
import artifacts from '../../../../artifacts/contracts/ZombieFactory.sol/ZombieFactory.json';
import { ContractStoreBase } from '../ContractBase';

export class ZombieFactory extends ContractStoreBase {
    readonly address = '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9';

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
        this.contract.on('NewZombie', (id, name, dna, contract) => {
            console.log('NEW ZOMBIE', id, name, dna, contract);
        });
        makeObservable(this, {
            createRandomZombie: action,
        });
    }

    createRandomZombie(name: string): void {
        this.signerContract?.createRandomZombie(name);
    }

    async getZombies() {
        const zombies = await this.contract?.getZombies();
        return zombies;
    }
}
