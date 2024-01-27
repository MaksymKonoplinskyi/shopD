import React from "react"
import { useMetaMask } from "metamask-react"

export const MetaMaskButton = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask()
  if (status === "initializing")
    return <div>Synchronisation with MetaMask ongoing...</div>

  if (status === "unavailable")
    return (
      <div>
        Not able to locate an Ethereum connection, please install a Metamask
        wallet
      </div>
    )
  if (status === "notConnected")
    return (
      <button
        className='bg-white border-black
                font-sans
                border text-black w-1/2 cursor-pointer
                my-8 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
        onClick={connect}
      >
        Connect to MetaMask
      </button>
    )

  //   if (status === "notConnected")
  //     return <button onClick={connect}>Connect to MetaMask</button>

  if (status === "connecting")
    return (
      <button
        className='bg-white border-black
          font-sans
          border text-black w-1/2 cursor-pointer
          my-8 py-3 text-sm tracking-widest font-[900]
          hover:bg-gray-200 hover:border-gray-200 '
        onClick={connect}
      >
        Connecting...
      </button>
    )

  if (status === "connected")
    return (
      <div>
        <button
          className='bg-white border-black
          font-sans
          border text-black w-1/2 cursor-auto
          my-8 py-3 text-sm tracking-widest font-[900]
          hover:bg-gray-200'
          //   onClick={connect}
        >
          {account}
        </button>
        <p>Current chain ID {chainId}</p>
        {/* Connected account {account} on chain ID {chainId} */}
      </div>
    )

  return null
}
