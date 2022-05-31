import abi from '../utils/BuyMeACoffee.json';
import { ethers } from "ethers";
import Head from 'next/head';
import Main from '../components/Main';
import React, { useEffect, useState } from "react";

import tw from 'tailwind-styled-components';


export default function Home() {
  // Contract Address & ABI
  const contractAddress = "0x68C2FD25834dc64f94e3a1b15823CDFe1220C831";
  const contractABI = abi.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [memos, setMemos] = useState([]);

  const onNameChange = event => {
    setName(event.target.value);
  };

  const onMessageChange = event => {
    setMessage(event.target.value);
  };

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      console.log('accounts: ', accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log('wallet is connected! ' + account);
      } else {
        console.log('make sure MetaMask is connected');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('please install MetaMask');
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const buyCoffee = async (amount) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, 'any');
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log('buying coffee..');
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : 'anon',
          message ? message : 'Enjoy your coffee!',
          { value: ethers.utils.parseEther(amount) }
        );

        await coffeeTxn.wait();

        console.log('mined ', coffeeTxn.hash);

        console.log('coffee purchased!');

        // Clear the form fields.
        setName('');
        setMessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log('fetching memos from the blockchain..');
        const memos = await buyMeACoffee.getMemos();
        console.log('fetched!');
        setMemos(memos);
      } else {
        console.log('Metamask is not connected');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let buyMeACoffee;
    isWalletConnected();
    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      console.log('Memo received: ', from, timestamp, name, message);
      setMemos(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };

    const { ethereum } = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, 'any');
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

      buyMeACoffee.on('NewMemo', onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off('NewMemo', onNewMemo);
      }
    };
  }, []);

  return (
    <Container>
      <div >
        <Head>
          <title>Buy Ryan a Coffee!</title>
          <meta name="description" content="Tipping site" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main />


        {currentAccount ? (
          <div className="flex items-center justify-center max-w-screen-sm ">

            <form className="p-6 mx-auto mt-2 font-mono bg-white rounded-content rounded-xl">
              <div>
                <label>
                  Name
                </label>
                <br />

                <input
                  id="name"
                  type="text"
                  placeholder="anon"
                  onChange={onNameChange}
                />
              </div>
              <br />
              <div>
                <label>
                  Send Ryan a message
                </label>
                <br />

                <textarea
                  rows={3}
                  placeholder="Enjoy your coffee!"
                  id="message"
                  onChange={onMessageChange}
                  required
                >
                </textarea>
              </div>
              <div className="flex flex-col flex-grow">
                <button type="button" className="relative px-6 py-2 mt-4 mb-4 group">
                  <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                  <span className="relative text-black group-hover:text-white" type="button" onClick={() => buyCoffee("0.001")}> Buy Ramen for 0.01 ETH</span>
                </button>
                <button type="button" className="relative px-6 py-2 group">
                  <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                  <span className="relative text-black group-hover:text-white" type="button" onClick={() => buyCoffee("0.003")}> Buy Ramen XL for 0.03 ETH</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="flex justify-center my-5 ">
            <button className="relative px-6 py-2 group">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
              <span className="relative text-black group-hover:text-white" onClick={connectWallet} > Connect Wallet</span>
            </button>
          </div>
        )}
        <div>

          {currentAccount && (<h1 className="flex flex-col mx-auto mb-2 text-5xl font-black ">Memos received</h1>)}

          {currentAccount && (memos.map((memo, idx) => {
            return (
              <div key={idx} className="flex border-4 border-slate-800 ">
                <p className="flex flex-col items-center justify-center m-4 ">"{memo.message}"</p>
                <p className="flex flex-col items-center justify-center ">From: {memo.name} at {memo.timestamp.toString()}</p>
              </div>
            );
          }))}

          <footer className="flex flex-col mt-5 ">
            <a
              href="https://ryanlisse.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Created by @Ryanlisse for Alchemy's Road to Web3 lesson two!
            </a>
          </footer>
        </div>
      </div>

    </Container>
  );
}


const Container = tw.div`
       h-screen 
       w-auto
        flex
        flex-col
        justify-center
        items-center
        text-sm
        font-bold
        bg-slate-50
        text-black

        `;


