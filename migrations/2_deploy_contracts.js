var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Homegrow = artifacts.require('./Homegrow.sol')

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Homegrow); 
};
