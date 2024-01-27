import { Box, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import {
  fetchUpdateOrder,
  setActiveStep,
  setPaymentMethod,
} from "../../redux/slices/cart"
import { useAppDispatch, useAppSelector } from "../../../hook"

import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { IDataForOrderUpdate, IPromo, ShippingAddress } from "../../types/data"
import { findTotalPrice, findTotalPriceWithDiscount } from "../../helpers/price"

export const PaymentMethodStep = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState("")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const savedOrderId = JSON.parse(
    localStorage.getItem("orderId") || "null"
  ) as string
  const savedUserEmail = JSON.parse(
    localStorage.getItem("userEmail") || "[]"
  ) as string
  const savedShippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress") || "null"
  ) as ShippingAddress
  const savedPromo = JSON.parse(
    localStorage.getItem("promo") || "null"
  ) as IPromo

  // const shippingAddress = useAppSelector(state => state.cart.shippingAddress)
  // const userEmail = useAppSelector(state => state.cart.userEmail)
  const originsInCart = useAppSelector(state => state.cart.originsInCart)
  const orderProductsData = originsInCart.map(
    origin =>
      `id: ${origin.id}, name: ${origin.attributes.name}, price: ${origin.attributes.price},`
  )
  const orderProducts = orderProductsData.join(`\n`)
  const totalPrice: number = findTotalPrice(originsInCart)
  const totalPriceWithDiscount = findTotalPriceWithDiscount(
    totalPrice,
    savedPromo?.discount
  )

  const dataForOrderUpdate: IDataForOrderUpdate = {
    orderId: savedOrderId,
    userEmail: savedUserEmail,
    orderProducts,
    totalPrice,
    promoCode: savedPromo?.promoCode,
    discount: savedPromo?.discount,
    totalPriceWithDiscount,
    ...savedShippingAddress,
  }

  return (
    <div className='mx-auto'>
      <p>Choose Payment Method</p>

      <FormControl>
        {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value='swift'
            control={<Radio />}
            label='SWIFT'
          />
          <FormControlLabel
            value='sepa'
            control={<Radio />}
            label='SEPA'
          />
          <FormControlLabel
            value='crypto'
            control={<Radio />}
            label='Pay with cryptocurrency'
          />
        </RadioGroup>
      </FormControl>

      <div className='flex justify-between space-x-4 py-4'>
        <button
          // type='submit'
          className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                my-8 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
          onClick={() => {
            dispatch(setActiveStep(1))
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
          // disabled={true}
          onClick={() => {
            if (value === "") {
              alert("First you need to choose a payment method")
            } else {
              dispatch(setPaymentMethod(value))
              dispatch(
                fetchUpdateOrder({
                  ...dataForOrderUpdate,
                  paymentMethod: value,
                })
              )
              dispatch(setActiveStep(3))
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
