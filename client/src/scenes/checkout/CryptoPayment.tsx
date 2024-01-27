import { Box, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import { setActiveStep } from "../../redux/slices/cart"
import { useAppDispatch, useAppSelector } from "../../../hook"

import { useMetaMask } from "metamask-react"
import { MetaMaskButton } from "./MetaMaskButton"
import { IOriginItem, IPaymentProps, IPromo } from "../../types/data"
import { findTotalPrice, findTotalPriceWithDiscount } from "../../helpers/price"

export const CryptoPayment: React.FC<IPaymentProps> = ({
  finalPrice,
  orderId,
}) => {
  const dispatch = useAppDispatch()

  return (
    <div className='mx-auto'>
      <h1>Crypto Payment</h1>
      <div className='md:flex'>
        <div className='md:w-1/2'>
          <p className='font-semibold'>Warnings</p>
          <p className='font-semibold'>
            Send only BUSD on BSC BNB Smart Chain (BEP20) · Other assets will be
            lost
          </p>
          <p className='opacity-70 text-sm mt-2'>BSC BNB Smart Chain (BEP20) wallet address</p>
          <p className='font-semibold'>0xBed2AEBEce4B0D0234Cf7000eFe26391687019cD</p>
          <p className='opacity-70 text-sm mt-2'>Amount</p>
          <p className='font-semibold'>{finalPrice} BUSD</p>

        </div>
        <div></div>
      </div>
      
    </div>
  )
}
