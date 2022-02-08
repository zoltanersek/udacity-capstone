// Test if a new solution can be added for contract - SolnSquareVerifier
var proofConfig =  require("../../zokrates/code/square/proof.json")
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
const SquareVerifier = artifacts.require('SquareVerifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('TestSolnSquareVerifier', accounts => {
    describe('test minting', () => {
        beforeEach(async () => {
            const squareContract = await SquareVerifier.new({from: accounts[0]});
            this.contract = await SolnSquareVerifier.new(
                squareContract.address, {from: accounts[0]}
            );
        });

        it('should mint', async () => {
            let {proof, input} = proofConfig;
            await this.contract.mint(accounts[0], 1, "1", proof.A, proof.A_p, proof.B,
            proof.B_p, proof.C, proof.C_p, proof.H, proof.K, input)

            let owner = await this.contract.ownerOf.call(1);
            assert.equal(owner, accounts[0])
        })

        it('should not mint for same solution', async () => {
            let {proof, input} = proofConfig;
            await this.contract.mint(accounts[0], 1, "1", proof.A, proof.A_p, proof.B,
            proof.B_p, proof.C, proof.C_p, proof.H, proof.K, input)

            let owner = await this.contract.ownerOf.call(1);
            assert.equal(owner, accounts[0])

            var reverted = false
            try {
                let {proof, input} = proofConfig;
            await this.contract.mint(accounts[0], 2, "2", proof.A, proof.A_p, proof.B,
            proof.B_p, proof.C, proof.C_p, proof.H, proof.K, input)
            } catch (e) {
                reverted = true
            }
            assert.equal(reverted, true)
        })


    })
})