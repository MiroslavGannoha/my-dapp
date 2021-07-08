//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;


contract ZombieFactory {

    // declare our event here
    event NewZombie (uint id, string name, uint dna);

    uint private dnaDigits = 16;
    uint private dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function createRandomZombie(string memory _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

    function getZombies() public view returns (Zombie[] memory) {
        return zombies;
    }

    function _createZombie(string memory _name, uint _dna) private {
        zombies.push(Zombie(_name, _dna));
        uint id = zombies.length - 1;
        emit NewZombie(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }
}
