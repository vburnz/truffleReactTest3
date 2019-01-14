import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Homegrow from './contracts/Homegrow.json'
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, balance: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Homegrow.networks[networkId];
      //console.log(deployedNetwork.address); 
      const instance = new web3.eth.Contract(
        Homegrow.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(instance); 

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    
    
    //   const mint = await contract.methods.minter(); 
    // const balance =  await contract.methods.minter().call(); 
    // conso
    
    
    // await contract.methods.
   
    // const balance = await contract.methods.balances('0x67fd37f1078fDCB5FF9D85BacDb8a61aB9f89956').call();
    // Update state with the result.
    this.setState({storageValue: 5});
  };

  sendMoney = async() => {
    const { accounts, contract } = this.state;
    await contract.methods.sendMoney('0x67fd37f1078fDCB5FF9D85BacDb8a61aB9f89956', '0xfFda394ec4485BfE9849679666A1aca10A42eD30', 10)
    const balance1 = await contract.methods.getBalance('0x67fd37f1078fDCB5FF9D85BacDb8a61aB9f89956').call(); 
    const balance2 = await contract.methods.getBalance('0xfFda394ec4485BfE9849679666A1aca10A42eD30').call();
      console.log(balance1, balance2); 
  
  }

  mintMoney = async() =>{
    const { accounts, contract } = this.state;
    console.log(this.state); 
    console.log('accounts', accounts); 
    //await contract.methods.mint('0x67fd37f1078fDCB5FF9D85BacDb8a61aB9f89956', 20).send({from: accounts[0]})
    const minter = await contract.methods.minter(); 
    console.log(minter); 
  }

  render() {
    console.log(this.state); 
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <button onClick={this.mintMoney}>Mint Money</button>
        <button onClick={this.sendMoney}>Send Money</button>

        {/* <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default App;
