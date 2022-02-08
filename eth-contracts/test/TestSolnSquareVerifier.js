// Test if a new solution can be added for contract - SolnSquareVerifier

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
            await this.contract.mint(accounts[0], 1, "1", ["0x2b4e93754ad21fa13891baeb5a327779b6f39b41cca4bc4c78fdbf596ee46ae6", "0x27190b39112671bf8f4448cd0df5b221c56439138122fc69f3e0aa764c4e7cd7"],
            ["0x1793ce87e581cbea9ba322b77457c343aae5fda1bebda0bf092c6bd8c4d68fc8", "0x2f276ed12b18c503ff4439db5a91a3d4546afd066ca159d9c474daed2285ce1e"],
            [["0x1c8d5a16bcac4d8885c6e6a559f082b452317228962699f3900d3047372a4250", "0xa8336ed408a10eb58e6ab2335bf7192c81e373c15e46c619399c7a712f9342d"], ["0x3013b611d494a99111e04d68ac0ea499f13de7f0ac4fb66786249749a0b62399", "0x2c856277fb151dbf11b09ee57dc5a4ca42dbc433e79f17925b75ad8fa652b2f9"]],
            ["0x22edfaff1788816385e80e5a0d491e0f6ec9efab64ab535c933df87b18e38cf", "0x2558476e6289902340a3995bb9e1ae7a56712b062b1c1a91f13c678aa1c12d04"],
            ["0xbc3544e38f0f3b9811eb8c813767d8d0813b2294c7df8916529a28a973a2fbe", "0xfa9705727bcc2c73f158dfa2923ad62142fd3db785722d0959d493adaebd42a"],
            ["0xe8a5237a72f4dc89d75b46107f30db70c7254d49ea741d5d566d4b0ee3d8527", "0x22001d4198d8e378e89eb733b7cec0f595e07ac859fb1564194388c78682349e"],
            ["0x18a8f93a5067261549069ce8eb5b668bea95b6ca184cc5198e654d80ce82b41b", "0x1383bb88e2f1ae9058e9d8e158ff0060b0957e768a45dc904feaf7e3bc43f626"],
            ["0x627512a0fda3fd28f532f2d4c42eba49b79e4b8e784cab2541fa309270bf635", "0x107854258249b9860401f97a458174f9e2c31cf4bba94705cddcab20cbc4384"],
            [9,1])

            let owner = await this.contract.ownerOf.call(1);
            assert.equal(owner, accounts[0])
        })

        it('should not mint for same solution', async () => {
            await this.contract.mint(accounts[0], 1, "1", ["0x2b4e93754ad21fa13891baeb5a327779b6f39b41cca4bc4c78fdbf596ee46ae6", "0x27190b39112671bf8f4448cd0df5b221c56439138122fc69f3e0aa764c4e7cd7"],
            ["0x1793ce87e581cbea9ba322b77457c343aae5fda1bebda0bf092c6bd8c4d68fc8", "0x2f276ed12b18c503ff4439db5a91a3d4546afd066ca159d9c474daed2285ce1e"],
            [["0x1c8d5a16bcac4d8885c6e6a559f082b452317228962699f3900d3047372a4250", "0xa8336ed408a10eb58e6ab2335bf7192c81e373c15e46c619399c7a712f9342d"], ["0x3013b611d494a99111e04d68ac0ea499f13de7f0ac4fb66786249749a0b62399", "0x2c856277fb151dbf11b09ee57dc5a4ca42dbc433e79f17925b75ad8fa652b2f9"]],
            ["0x22edfaff1788816385e80e5a0d491e0f6ec9efab64ab535c933df87b18e38cf", "0x2558476e6289902340a3995bb9e1ae7a56712b062b1c1a91f13c678aa1c12d04"],
            ["0xbc3544e38f0f3b9811eb8c813767d8d0813b2294c7df8916529a28a973a2fbe", "0xfa9705727bcc2c73f158dfa2923ad62142fd3db785722d0959d493adaebd42a"],
            ["0xe8a5237a72f4dc89d75b46107f30db70c7254d49ea741d5d566d4b0ee3d8527", "0x22001d4198d8e378e89eb733b7cec0f595e07ac859fb1564194388c78682349e"],
            ["0x18a8f93a5067261549069ce8eb5b668bea95b6ca184cc5198e654d80ce82b41b", "0x1383bb88e2f1ae9058e9d8e158ff0060b0957e768a45dc904feaf7e3bc43f626"],
            ["0x627512a0fda3fd28f532f2d4c42eba49b79e4b8e784cab2541fa309270bf635", "0x107854258249b9860401f97a458174f9e2c31cf4bba94705cddcab20cbc4384"],
            [9,1])

            let owner = await this.contract.ownerOf.call(1);
            assert.equal(owner, accounts[0])

            var reverted = false
            try {
                await this.contract.mint(accounts[0], 2, "2", ["0x2b4e93754ad21fa13891baeb5a327779b6f39b41cca4bc4c78fdbf596ee46ae6", "0x27190b39112671bf8f4448cd0df5b221c56439138122fc69f3e0aa764c4e7cd7"],
                ["0x1793ce87e581cbea9ba322b77457c343aae5fda1bebda0bf092c6bd8c4d68fc8", "0x2f276ed12b18c503ff4439db5a91a3d4546afd066ca159d9c474daed2285ce1e"],
                [["0x1c8d5a16bcac4d8885c6e6a559f082b452317228962699f3900d3047372a4250", "0xa8336ed408a10eb58e6ab2335bf7192c81e373c15e46c619399c7a712f9342d"], ["0x3013b611d494a99111e04d68ac0ea499f13de7f0ac4fb66786249749a0b62399", "0x2c856277fb151dbf11b09ee57dc5a4ca42dbc433e79f17925b75ad8fa652b2f9"]],
                ["0x22edfaff1788816385e80e5a0d491e0f6ec9efab64ab535c933df87b18e38cf", "0x2558476e6289902340a3995bb9e1ae7a56712b062b1c1a91f13c678aa1c12d04"],
                ["0xbc3544e38f0f3b9811eb8c813767d8d0813b2294c7df8916529a28a973a2fbe", "0xfa9705727bcc2c73f158dfa2923ad62142fd3db785722d0959d493adaebd42a"],
                ["0xe8a5237a72f4dc89d75b46107f30db70c7254d49ea741d5d566d4b0ee3d8527", "0x22001d4198d8e378e89eb733b7cec0f595e07ac859fb1564194388c78682349e"],
                ["0x18a8f93a5067261549069ce8eb5b668bea95b6ca184cc5198e654d80ce82b41b", "0x1383bb88e2f1ae9058e9d8e158ff0060b0957e768a45dc904feaf7e3bc43f626"],
                ["0x627512a0fda3fd28f532f2d4c42eba49b79e4b8e784cab2541fa309270bf635", "0x107854258249b9860401f97a458174f9e2c31cf4bba94705cddcab20cbc4384"],
                [9,1])
            } catch (e) {
                reverted = true
            }
            assert.equal(reverted, true)
        })


    })
})