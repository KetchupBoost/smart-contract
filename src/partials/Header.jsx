import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";


function Header() {

  const [top, setTop] = useState(true);
  const [currentAccount, setCurrentAccount] = useState("");

  // State Variable to store our user's public wallet.
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      // Check if the user have the MetaMask Extension
      if (!ethereum) {
        console.log("Make sure you have MestaMask!!!!");
      } else {
        console.log("We have the ethereum object ", ethereum);
      }

      // Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request( {method: "eth_accounts"} );

      if (accounts.length !== 0) {
        const account = accounts[0];

        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () = {
    try {
      const { ethereum } = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = new provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      }
    }
  }
  
  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
              </svg>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <Link to="/signin" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Sign in</Link>
              </li>
              {currentAccount
                ?<li>
                  <button className="btn-sm text-blue-100 text-transparent bg-gradient-to-r from-blue-500 to-teal-400 ml-3" >
                    Connected
                  </button>
                </li>
                :<li>
                  <button className="btn-sm text-blue-100 text-transparent bg-gradient-to-r from-blue-500 to-teal-400 ml-3" onClick={connectWallet}>
                    Connect Wallet
                  </button>
                </li>
              }
              <li>
                <Link to="/signup" className="btn-sm text-white bg-gray-900 hover:bg-gray-800 ml-3">
                  <span>Sign up</span>
                  <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>                  
                </Link>
              </li>
            </ul>

          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
