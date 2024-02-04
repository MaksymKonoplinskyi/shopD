import { Box, InputBase, Divider, Typography, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'
// import { IEmailData, IEmailDataE, IValues } from "./Checkout"
import { FormikErrors, FormikTouched } from 'formik'
import { Formik, Field, Form, FormikHelpers } from 'formik'

import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../../hook'
import { setUserEmail } from '../../../redux/slices/cart'
import { fetchSubscribeEmail } from '../../../redux/slices/home'
import { fetchCollaborationUserData } from '../../../redux/slices/collaboration'

const MyInputLabelProps = {
  sx: {
    color: '#000000 !important',
    opacity: '0.5',
  },
}
const MyInputProps = {
  sx: {
    '& fieldset': {
      border: '1px solid !important',
      borderRadius: 0,
      opacity: '0.3',
    },
  },
}

const validationSchema = yup.object({
  name: yup.string().required('required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  company: yup.string(),
  comment: yup.string().required('required'),
})

export const CollaborationPage: React.FC = () => {
  // const [email, setEmail] = useState("")

  const dispatch = useAppDispatch()
  const { firstName } = JSON.parse(localStorage.getItem('shippingAddress') || 'false') as { firstName: string }
  const savedUserEmail = JSON.parse(localStorage.getItem('userEmail') || '[]') as string

  // useEffect(() => {
  //   dispatch(setUserEmail(savedUserEmail))
  // }, [])
  const userEmail = useAppSelector(state => state.cart.userEmail)
  const formik = useFormik({
    initialValues: {
      name: firstName || '',
      email: savedUserEmail || userEmail || '',
      company: '',
      comment: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2))
      dispatch(fetchCollaborationUserData(formik.values))
      // dispatch(setUserEmail(formik.values.email))
    },
  })
  return (
    <>
      <div className='container mt-8'>
        <div>
          <Typography variant='h3' className='text-center'>
            Contact
          </Typography>
        </div>
        <div className='mt-8'>
          <Typography>
            Special offer. <br /> We invite interior designers, art dealers, art stores, galleries, influencers, and everyone connected with art and interested in mutually beneficial cooperation to join our team. We are pleased to offer exclusive deals and individual promo codes to our partners. Just leave your contact information and tell us a little bit about yourself so we can get in touch and discuss the details of our collaboration. We are waiting for your message and look forward to a long-term partnership!
          </Typography>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          // className='flex justify-between gap-4 mt-8'
        >
          <div className='grid gap-4 grid-cols-4 mt-8'>
            <TextField InputLabelProps={MyInputLabelProps} InputProps={MyInputProps} fullWidth id='name' name='name' label='Name' onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} className={'col-span-4 sm:col-span-2'} />
            <TextField InputLabelProps={MyInputLabelProps} InputProps={MyInputProps} fullWidth id='email' name='email' label='Email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} className={'col-span-4 sm:col-span-2'} />
            <TextField InputLabelProps={MyInputLabelProps} InputProps={MyInputProps} fullWidth id='company' name='company' label='Company (optional)' onBlur={formik.handleBlur} value={formik.values.company} onChange={formik.handleChange} error={formik.touched.company && Boolean(formik.errors.company)} helperText={formik.touched.company && formik.errors.company} className={'col-span-4'} />
            <TextField InputLabelProps={MyInputLabelProps} InputProps={MyInputProps} fullWidth multiline rows={4} id='comment' name='comment' label='Comment' onBlur={formik.handleBlur} value={formik.values.comment} onChange={formik.handleChange} error={formik.touched.comment && Boolean(formik.errors.comment)} helperText={formik.touched.comment && formik.errors.comment} className={'col-span-4'} />
          </div>
          <button
            type='submit'
            className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 h-14 mt-8
                '
          >
            Send
          </button>
        </form>
      </div>
    </>
  )
}
