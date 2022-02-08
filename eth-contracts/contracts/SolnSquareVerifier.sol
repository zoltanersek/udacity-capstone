// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
pragma solidity ^0.5.0;

import "./ERC721Mintable.sol";
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {

    SquareVerifier squareVerifier;

    constructor (address _squareVerifier) public {
        squareVerifier = SquareVerifier(_squareVerifier);
    }

// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId;
        address to;
    }

// TODO define an array of the above struct
    Solution[] private solutions;

// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) uniqueSolutions;


// TODO Create an event to emit when a solution is added
    event AddSolution(address to, uint256 tokenId, bytes32 key);


// TODO Create a function to add the solutions to the array and emit the event
    function _addSolution(address _to, uint256 _tokenId, bytes32 _key) internal {
        Solution memory solution = Solution(_tokenId, _to);
        solutions.push(solution);
        uniqueSolutions[_key] = solution;
        emit AddSolution(_to, _tokenId, _key);
    }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mint(address to, uint256 tokenId, string memory tokenUri, uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p,
            uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input
    ) public whenNotPaused {
        bytes32 key = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        require(uniqueSolutions[key].to == address(0), "Solution is already in use");
        require(squareVerifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Solution not valid");
        _addSolution(to, tokenId, key);
        super.mint(to, tokenId, tokenUri);
    }
}
  

interface SquareVerifier {
    function verifyTx(
            uint[2] calldata a,
            uint[2] calldata a_p,
            uint[2][2] calldata b,
            uint[2] calldata b_p,
            uint[2] calldata c,
            uint[2] calldata c_p,
            uint[2] calldata h,
            uint[2] calldata k,
            uint[2] calldata input
    )
        external
        returns(bool r);
}


























