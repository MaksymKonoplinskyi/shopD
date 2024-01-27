import { Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import { IEmailData, IEmailDataE, IValues } from "./Checkout"
import { FormikErrors, FormikTouched } from "formik"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { getIn } from "formik"

import { useFormik } from "formik"
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from "../../../hook"
import {
  fetchUpdateOrder,
  setActiveStep,
  setShippingAddress,
} from "../../redux/slices/cart"
import { IDataForOrderUpdate, IPromo, ShippingAddress } from "../../types/data"
import { useEffect } from "react"
import { findTotalPrice, findTotalPriceWithDiscount } from "../../helpers/price"

const MyInputLabelProps = {
  sx: {
    color: "#000000 !important",
    opacity: "0.5",
  },
}
const MyInputProps = {
  sx: {
    "& fieldset": {
      border: "1px solid !important",
      borderRadius: 0,
      opacity: "0.3",
    },
  },
}

const validationSchema = yup.object({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  country: yup.string().required("required"),
  street: yup.string().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
  zipCode: yup.string().required("required"),
})

const label = { inputProps: { "aria-label": "Checkbox demo" } }

export const ShippingStep: React.FC = () => {
  const dispatch = useAppDispatch()
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
  const totalPriceWithDiscount = findTotalPriceWithDiscount(totalPrice, savedPromo?.discount)
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

  // const dataShippingAddressUpdate: IShippingAddressUpdate = {
  //   orderId: savedOrderId || orderId,
  //   shippingAddress,
  // }
  useEffect(() => {
    dispatch(setShippingAddress(savedShippingAddress))
  }, [])
  const formik = useFormik({
    initialValues: savedShippingAddress
      ? savedShippingAddress
      : {
          firstName: "",
          lastName: "",
          country: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(setShippingAddress(formik.values))
      dispatch(fetchUpdateOrder({...dataForOrderUpdate, ...formik.values}))
      dispatch(setActiveStep(2))
    },
  })

  return (
    <div>
      <p className='font-sans text-lg mb-6'>Shipping Information</p>
      <form onSubmit={formik.handleSubmit}>
        <div className='grid gap-4 grid-cols-4'>
          <TextField
            InputLabelProps={MyInputLabelProps}
            InputProps={MyInputProps}
            fullWidth
            id='firstName'
            name='firstName'
            label='First Name'
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            className={"col-span-4 sm:col-span-2"}
          />
          <TextField
            InputLabelProps={MyInputLabelProps}
            InputProps={MyInputProps}
            fullWidth
            type='text'
            label='Last Name'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastName}
            name={"lastName"}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            className={"col-span-4 sm:col-span-2"}
          />
          <TextField
            InputLabelProps={MyInputLabelProps}
            InputProps={MyInputProps}
            fullWidth
            type='text'
            label='Country'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.country}
            name={"country"}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            className={"col-span-4 lg:col-span-2"}
          />
          <TextField
            InputLabelProps={MyInputLabelProps}
            InputProps={MyInputProps}
            fullWidth
            type='text'
            label='Street Address'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.street}
            name={"street"}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
            className={"col-span-4 lg:col-span-2"}
          />

          <TextField
            InputLabelProps={MyInputLabelProps}
            InputProps={MyInputProps}
            fullWidth
            type='text'
            label='City'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            name={"city"}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            className={"col-span-4 sm:col-span-2"}
          />
          <TextField
            InputLabelProps={MyInputLabelProps}
            InputProps={MyInputProps}
            fullWidth
            type='text'
            label='State'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.state}
            name={"state"}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            className={"col-span-2 sm:col-span-1"}
          />
          <TextField
            InputLabelProps={MyInputLabelProps}
            InputProps={MyInputProps}
            fullWidth
            type='text'
            label='Zip Code'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.zipCode}
            name={"zipCode"}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={formik.touched.zipCode && formik.errors.zipCode}
            className={"col-span-2 sm:col-span-1"}
          />
        </div>

        <div className='flex justify-between space-x-4 py-4'>
          <button
            // type='submit'
            className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                my-8 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
            onClick={() => {
              dispatch(setActiveStep(0))
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
        </div>
      </form>
    </div>
  )
}
