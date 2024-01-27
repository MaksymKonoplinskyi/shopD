import { Box, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import { setActiveStep } from "../../redux/slices/cart"
import { useAppDispatch, useAppSelector } from "../../../hook"

import { useMetaMask } from "metamask-react"
import { MetaMaskButton } from "./MetaMaskButton"
import { IOriginItem, IPaymentProps, IPromo } from "../../types/data"
import { findTotalPrice, findTotalPriceWithDiscount } from "../../helpers/price"


export const CryptoPayment: React.FC<IPaymentProps> = ({finalPrice, orderId}) => {
  const dispatch = useAppDispatch()
  const { status, connect, account, chainId, ethereum } = useMetaMask()
  const tokenAmount = finalPrice
  const TOKEN_CONTRACT_ADDRESS = 0xe9e7cea3dedca5984780bafc599bd69add087d56 // bnb
  const receiverAddress = 0xbed2aebece4b0d0234cf7000efe26391687019cd // Nata bnb adress
  //   const transactionParameters = {
  //     from: account,
  //     to: tokenContractAddress,
  //     data: getDataFieldValue(tokenRecipientAddress, tokenAmount),
  // };
  const tokenContract = ethereum ////////////////////////////////////////////////////

  const handlPayNow: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: TOKEN_CONTRACT_ADDRESS,
            data: tokenContract.methods
              .transfer(receiverAddress, tokenAmount)
              .encodeABI(),
          },
        ],
      })
      .then((result: any) => console.log(result))
      .catch((error: any) => console.error(error))
  }
  return (
    <div className='mx-auto'>
      <h1>Crypto Payment</h1>
      <MetaMaskButton />
      Warnings
      Send only USDT on BSC BNB Smart Chain (BEP20) · Other assets will be lost
      BSC BNB Smart Chain (BEP20) wallet address
      0xBed2AEBEce4B0D0234Cf7000eFe26391687019cD
      
      <p>Amount: <b>{finalPrice} BUSD</b></p>
      <button
        // type='submit'
        className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                my-8 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
        onClick={handlPayNow}
      >
        Pay Now
      </button>
      {/* <div className='flex justify-between space-x-4 py-4'>
        <button
          // type='submit'
          className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                my-8 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
          onClick={() => {
            dispatch(setActiveStep(2))
            // dispatch(setIsCartOpen())
          }}
        >
          Prev
        </button>
        <button
          type='submit'
          className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                my-8 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
          // onClick={() => {
          // dispatch(addToCart(currentProduct))
          // dispatch(setIsCartOpen())
          // }}
        >
          Next
        </button>
      </div> */}
    </div>
  )
}
