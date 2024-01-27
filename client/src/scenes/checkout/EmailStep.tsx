// import { Box, Button, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
// import { IEmailData, IEmailDataE, IValues } from "./Checkout"
import { FormikErrors, FormikTouched } from "formik"
import { Formik, Field, Form, FormikHelpers } from "formik"

import { useFormik } from "formik"
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from "../../../hook"
import {
  fetchCreateOrder,
  setActiveStep,
  setRememberMe,
  setUserEmail,
} from "../../redux/slices/cart"
import { useEffect } from "react"
import {
  IDataForOrderCreate,
  IPromo,
} from "../../types/data"
import { findTotalPrice, findTotalPriceWithDiscount } from "../../helpers/price"

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
})

export const EmailStep: React.FC = () => {
  const dispatch = useAppDispatch()

  const rememberMe = useAppSelector(state => state.cart.rememberMe)
  const savedOrderId = JSON.parse(
    localStorage.getItem("orderId") || "null"
  ) as string
  const savedUserEmail = JSON.parse(
    localStorage.getItem("userEmail") || "[]"
  ) as string
  const savedPromo = JSON.parse(
    localStorage.getItem("promo") || "null"
  ) as IPromo

  useEffect(() => {
    dispatch(setUserEmail(savedUserEmail))
  }, [])

  const userEmail = useAppSelector(state => state.cart.userEmail)
  const originsInCart = useAppSelector(state => state.cart.originsInCart)
  const orderProductsData = originsInCart.map(
    origin =>
      `id: ${origin.id}, name: ${origin.attributes.name}, price: ${origin.attributes.price},`
  )
  const orderProducts = orderProductsData.join(`\n`)
  const orderId = useAppSelector(state => state.cart.orderId)
  const totalPrice: number = findTotalPrice(originsInCart)
  const totalPriceWithDiscount = findTotalPriceWithDiscount(
    totalPrice,
    savedPromo?.discount
  )
  const products = {
    set: originsInCart.map(origin => origin.id),
  }

  const dataForOrderCreate: IDataForOrderCreate = {
    userEmail,
    orderProducts,
    totalPrice: findTotalPrice(originsInCart),
    promoCode: savedPromo?.promoCode,
    discount: savedPromo?.discount,
    totalPriceWithDiscount,
    products,
  }

  const formik = useFormik({
    // onSubmit : handleFormSubmit,
    initialValues: {
      email: savedUserEmail || userEmail,
      rememberMe: rememberMe,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2))
      dispatch(setRememberMe(formik.values.rememberMe))
      dispatch(setUserEmail(formik.values.email))
      dispatch(setActiveStep(1))
      dispatch(fetchCreateOrder(dataForOrderCreate))
      // savedOrderId !== null
      //   ? dispatch(fetchUpdateOrder(dataForOrderUpdate))
      //   : dispatch(fetchCreateOrder(dataForOrderCreate))
    },
  })

  return (
    <div>
      <p className='font-sans text-lg mb-6'>Contact Information</p>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          InputLabelProps={{
            sx: {
              color: "#000000 !important",
              opacity: "0.5",
            },
          }}
          InputProps={{
            sx: {
              "& fieldset": {
                border: "1px solid !important",
                borderRadius: 0,
                opacity: "0.3",
              },
            },
          }}
          fullWidth
          id='email'
          name='email'
          label='Email'
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <div className='flex items-start space-x-3 py-4'>
          <input
            type='checkbox'
            name='rememberMe'
            defaultChecked={formik.values.rememberMe}
            className='border-gray-300 rounded-none h-5 w-5'
            onClick={formik.handleChange}
          />
          <div className='flex flex-col h-full my-auto'>
            <p className='text-gray-700 font-medium leading-none'>
              Remember me
            </p>
          </div>
        </div>

        <button
          type='submit'
          className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                my-8 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
        >
          Next
        </button>
      </form>
    </div>
  )
}
