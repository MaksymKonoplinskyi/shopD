// import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { useState } from "react"
import * as yup from "yup"
import { shades } from "../../theme"

// import Shipping from "./Shipping"
import { IOriginItem } from "../../types/data"
import { useAppSelector } from "../../../hook"
import { EmailStep } from "./EmailStep"
// import { PaymentMethodStep } from "./PaymentMethodStep"
// import { CriptoPayment } from "./CriptoPayment"
import { ShippingStep } from "./ShippingStep"
import { PaymentMethodStep } from "./PaymentMethodStep"
// import { CryptoPaymentStep } from "./CryptoPayment"
import { PaymentStep } from "./PaymentStep"
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51LgU7yConHioZHhlAcZdfDAnV9643a7N1CMpxlKtzI1AUWLsRyrord79GYzZQ6m8RzVnVQaHsgbvN1qSpiDegoPi006QkO0Mlc"
// );
export interface IEmailData {
  email: string
  // phoneNumber: string
}

export interface IEmailDataE {
  email: string | undefined
  // phoneNumber: string | undefined
}

export interface IValues {
  emailData: IEmailData
  shippingAddress: {
    firstName: string
    lastName: string
    country: string
    street: string
    city: string
    state: string
    zipCode: string
  }
}

export const Checkout: React.FC = () => {
  // const [activeStep, setActiveStep] = useState(1)
  const activeStep = useAppSelector(state => state.cart.activeStep)
  // const dispatch = useAppDispatch()
  const cart: IOriginItem[] = useAppSelector(state => state.cart.originsInCart)
  const isEmailStep = activeStep === 0
  const isShippingStep = activeStep === 1
  const isPaymentMethodStep = activeStep === 2
  const isPaymentStep = activeStep === 3
  // const cartItems: IOriginItem[] = useAppSelector(
  //   state => state.cart.originsInCart
  // )

  const handleFormSubmit = async (values: IValues, actions: any) => {
    // setActiveStep(activeStep + 1)
    // this copies the billing address onto shipping address
    // if (isFirstStep && values.shippingAddress.isSameAddress) {
    //   actions.setFieldValue("shippingAddress", {
    //     ...values.billingAddress,
    //     isSameAddress: true,
    //   });
    // }
    // if (isSecondStep) {
    //   makePayment(values);
    // }
    //   actions.setTouched({});
  }

  // async function makePayment(values) {
  //   const stripe = await stripePromise;
  //   const requestBody = {
  //     userName: [values.firstName, values.lastName].join(" "),
  //     email: values.email,
  //     products: cart.map(({ id, count }) => ({
  //       id,
  //       count,
  //     })),
  //   };

  // const response = await fetch("http://localhost:2000/api/orders", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(requestBody),
  // });
  // const session = await response.json();
  // await stripe.redirectToCheckout({
  //   sessionId: session.id,
  // });
  // }

  return (
    <div className='container mt-4'>
      <Stepper activeStep={activeStep} className={ ' my-8' } >
        <Step>
          <StepLabel>E-mail</StepLabel>
        </Step>
        <Step>
          <StepLabel>Shipping</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment method</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <div>
        {isEmailStep && <EmailStep />}
        {isShippingStep && <ShippingStep />}
        {isPaymentMethodStep && <PaymentMethodStep />}
        {isPaymentStep && <PaymentStep />}
        {/* <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            
            <form onSubmit={handleSubmit}>
              {isEmailStep && values.emailData && (
                <EmailStep
                  values={values.emailData}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  // setFieldValue={setFieldValue}
                />
              )}
              {isShippingStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isPaymentMethodStep && (
                <PaymentMethodStep
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  // setFieldValue={setFieldValue}
                />
              )}
              {isPaymentStep && (
                <CriptoPayment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  // setFieldValue={setFieldValue}
                />
              )}
              <Box display='flex' justifyContent='space-between' gap='50px'>
                {!isEmailStep && (
                  <button
                    type='submit'
                    className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                mt-10 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </button>
                )} */}

        {/* <button
                  type='submit'
                  className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                mt-10 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
                  onClick={() => {
                    // dispatch(addToCart(currentProduct))
                    // dispatch(setIsCartOpen())
                  }}
                >
                  {isShippingStep ? "Place Order" : "Next"}
                </button> */}
        {/* </Box> */}
        {/* </form> */}
        {/* )} */}
        {/* </Formik> */}
      </div>
    </div>
  )
}





 