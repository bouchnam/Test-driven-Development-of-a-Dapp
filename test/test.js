let Auction = artifacts.require("./Auction.sol");

let auctionInstance;

contract('AuctionContract', function (accounts) {
  //accounts[0] is the default account
  //Test case 1
  it("Contract deployment", function() {
    //Fetching the contract instance of our smart contract
    return Auction.deployed().then(function (instance) {
      //We save the instance in a gDlobal variable and all smart contract functions are called using this
      auctionInstance = instance;
      assert(auctionInstance !== undefined, 'Auction contract should be defined');
    });
  });

  //Sample Test Case
  it("Should set bidders", function() {
    return auctionInstance.register({from:accounts[1]}).then(function(result) {
        return auctionInstance.getPersonDetails(0);
    }).then(function(result) {
      assert.equal(result[2], accounts[1], 'bidder address set');
    })
  });

  //Test Case for checking if the bid is more than the token amount
  it("Should NOT allow to bid more than remaining tokens", function() {
    return auctionInstance.bid(0,6,{from: accounts[1]})
    .then(function (result) {
      throw("Failed to check remaining tokens less than count");
    }).catch(function (e) {
      var a = e.toString();
      if(e === "Failed to check remaining tokens less than count") {
        assert(false) 
      } else {
        assert(true)
      }
    })
  });
});
