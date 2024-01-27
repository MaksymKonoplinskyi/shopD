import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material"
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined"
import { useEffect, useState } from "react"

import TextField from "@mui/material/TextField"
// import { IEmailData, IEmailDataE, IValues } from "./Checkout"
import { FormikErrors, FormikTouched } from "formik"
import { Formik, Field, Form, FormikHelpers } from "formik"

import { useFormik } from "formik"
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from "../../../hook"
import { fetchCheckPromo } from "../../redux/slices/cart"
import { IPromo } from "../../types/data"

const validationSchema = yup.object({
  promoCode: yup.string(),
})

export const Promo: React.FC = () => {
  // const [email, setEmail] = useState("")

  const dispatch = useAppDispatch()
  // const hasPromoCode = JSON.parse(
  //   localStorage.getItem("hasSubscribe") || "false"
  // ) as string
  const savedPromo = JSON.parse(
    localStorage.getItem("promo") || "null"
  ) as IPromo

  useEffect(() => {
    if (savedPromo?.isCorrect === true)
      dispatch(fetchCheckPromo(savedPromo.promoCode))
  }, [])
  const promo = useAppSelector(state => state.cart.promo)

  const formik = useFormik({
    initialValues: {
      promoCode: savedPromo?.promoCode || "", // savedPromoCode || promoCode,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2))
      dispatch(fetchCheckPromo(formik.values.promoCode))
      // dispatch(setPromoCode(formik.values.promoCode))
    },
  })
  return (
    <>
      {/* <div className='text-center w-9/12 mx-auto'>
        <Typography variant='h3'>Add promo</Typography>
        <div className='mt-4'>
          <Typography>and receive early access to new originals</Typography>
        </div>
      </div> */}
      <form
        onSubmit={formik.handleSubmit}
        className='flex justify-between gap-4 mt-8'
      >
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
          id='promoCode'
          name='promoCode'
          label='Promo code'
          onBlur={formik.handleBlur}
          value={formik.values.promoCode}
          onChange={formik.handleChange}
          error={formik.touched.promoCode && Boolean(formik.errors.promoCode)}
          helperText={formik.touched.promoCode && formik.errors.promoCode}
        />
        <button
          type='submit'
          className='bg-black 
                font-sans
                text-white w-full cursor-pointer
                 text-sm tracking-widest font-[900] 
  
                  border border-black
                hover:bg-gray-700  
                // hover:opacity-95
                h-14'
        >
          Apply promo code
        </button>
      </form>
      <div className='my-4'>
        {promo.isCorrect && (
          <p>
            You have {promo.discount} % discount by promo code {promo.promoCode}
          </p>
        )}
        {promo.isCorrect === false && (
          <p className='text-red-500'>
            Promo code {promo.promoCode} is incorrect. Please try again
          </p>
        )}
      </div>
    </>
  )
}
//  hover:border-gray-200 border border-black
