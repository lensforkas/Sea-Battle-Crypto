import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SeaBattleABI from '../../contracts/SeaBattle.json';

const GameBoard = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const contractAddress = '0xYourContractAddress'; // Replace with your contract address
      const seaBattle = new web3.eth.Contract(SeaBattleABI.abi, contractAddress);
      setContract(seaBattle);
    } else {
      alert('Please install MetaMask!');
    }
  };

  const createShip = async () => {
    if (contract) {
      await contract.methods.createShip('Battleship', 5, 5).send({ from: account });
      alert('Ship created!');
    }
  };

  return (
    <div>
      <h2>Welcome to Sea Battle Crypto</h2>
      <button onClick={createShip}>Create Ship</button>
      {/* Add game board and other interface elements */}
    </div>
  );
};

export default GameBoard;
