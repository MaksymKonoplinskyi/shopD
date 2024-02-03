import { Box, InputBase, Divider, Typography, IconButton } from '@mui/material'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
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

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
})

const Subscribe: React.FC = () => {
  // const [email, setEmail] = useState("")

  const dispatch = useAppDispatch()
  const hasSubscribe = JSON.parse(localStorage.getItem('hasSubscribe') || 'false') as string
  const savedUserEmail = JSON.parse(localStorage.getItem('userEmail') || 'false') as string

  useEffect(() => {
    dispatch(setUserEmail(typeof savedUserEmail === 'string' ? savedUserEmail : ''))
  }, [])
  const userEmail = useAppSelector(state => state.cart.userEmail)
  const formik = useFormik({
    initialValues: {
      email: savedUserEmail || userEmail,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2))
      dispatch(fetchSubscribeEmail(formik.values.email))
      dispatch(setUserEmail(formik.values.email))
    },
  })
  return (
    <>
      <div className='text-center w-9/12 mx-auto'>
        <Typography variant='h3'>Subscribe To Our Newsletter</Typography>
        <div className='mt-4'>
          <Typography>and receive early access to new originals</Typography>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className='flex justify-between gap-4 mt-8'>
        <TextField
          InputLabelProps={{
            sx: {
              color: '#000000 !important',
              opacity: '0.5',
            },
          }}
          InputProps={{
            sx: {
              '& fieldset': {
                border: '1px solid !important',
                borderRadius: 0,
                opacity: '0.3',
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
          Subscribe
        </button>
      </form>
    </>
  )
}
//  hover:border-gray-200 border border-black
export default Subscribe
