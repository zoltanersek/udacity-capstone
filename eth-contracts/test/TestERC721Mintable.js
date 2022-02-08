var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1, "1");
            await this.contract.mint(account_one, 2, "2");
            await this.contract.mint(account_two, 3, "3");
            await this.contract.mint(account_two, 4, "4");
            await this.contract.mint(account_three, 5, "5");
            await this.contract.mint(account_three, 6, "6");
            await this.contract.mint(account_three, 7, "7");
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, 7)
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf.call(account_three)
            assert.equal(balance, 3)
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI.call(7)
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/7")
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_three, account_one, 7, {from: account_three})
            let owner = await this.contract.ownerOf.call(7)
            assert.equal(owner, account_one)
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let reverted = false
            try {
                await this.contract.mint(account_three, 8, "8", {from: account_three})
            } catch(e) {
                reverted = true
            }
            assert.equal(reverted, true)
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner.call()
            assert.equal(owner, account_one)
        })

    });
})