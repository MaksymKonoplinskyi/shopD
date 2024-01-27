import {
  fetchUpdateOrder,
  setActiveStep,
  setPaymentConfirm,
} from "../../redux/slices/cart"
import { useAppDispatch, useAppSelector } from "../../../hook"
import { CryptoPayment } from "./CryptoPayment"
import { IDataForOrderUpdate, IPromo, ShippingAddress } from "../../types/data"
import { findTotalPrice, findTotalPriceWithDiscount } from "../../helpers/price"
import { Product } from "../global/Product"
import { SwiftPayment } from "./SwiftPayment"
import { SepaPayment } from "./SepaPayment"

export const PaymentStep = () => {
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
  const totalPriceWithDiscount = findTotalPriceWithDiscount(
    totalPrice,
    savedPromo?.discount
  )
  const paymentMethod = useAppSelector(state => state.cart.paymentMethod)
  const dataForOrderUpdate: IDataForOrderUpdate = {
    orderId: savedOrderId,
    userEmail: savedUserEmail,
    orderProducts,
    totalPrice,
    promoCode: savedPromo?.promoCode,
    discount: savedPromo?.discount,
    totalPriceWithDiscount,
    ...savedShippingAddress,
    paymentMethod,
  }
  const paymentConfirm = useAppSelector(state => state.cart.paymentConfirm)
  return (
    <div className='mx-auto'>
      {/* <p>Payment step</p> */}
      <div className='grid md:grid-cols-4 grid-cols-2 gap-8 xl:gap-10 place-content-center'>
        {originsInCart.map(item => (
          <Product item={item} key={`${item.id}`} isTrack={false} />
        ))}
      </div>
      <div className='border-t border-b border-gray-200 px-4 py-6 sm:px-6 my-4'>
        {savedPromo?.isCorrect ? (
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <p>Subtotal ${totalPrice}</p>
            <p>discount: {savedPromo.discount} %</p>
            <p>Subtotal with discount: ${totalPriceWithDiscount}</p>
          </div>
        ) : (
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
        )}
      </div>
      {/* <p>Amount In USD: {totalPriceWithDiscount}</p> */}
      {paymentMethod === "swift" && (
        <SwiftPayment
          finalPrice={totalPriceWithDiscount}
          orderId={savedOrderId}
        />
      )}
      {paymentMethod === "sepa" && (
        <SepaPayment
          finalPrice={totalPriceWithDiscount}
          orderId={savedOrderId}
        />
      )}
      {paymentMethod === "crypto" && (
        <CryptoPayment
          finalPrice={totalPriceWithDiscount}
          orderId={savedOrderId}
        />
      )}
      {paymentConfirm ? (
        <p className='mt-8 text-green-500 text-center w-3/4 m-auto text-lg'>
          Thank you, your order is being processed. We will try to confirm the
          payment and ship your order as soon as possible. Immediately after
          that, you will receive a notification to your email.
        </p>
      ) : (
        <p className='mt-8  text-center w-3/4 m-auto text-lg'>
          Please pay for the order using the details and then click the button
          below to confirm the payment
        </p>
      )}

      <div className='flex justify-between space-x-4 py-4'>
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
          onClick={() => {
            dispatch(setPaymentConfirm(true))
            dispatch(
              fetchUpdateOrder({
                ...dataForOrderUpdate,
                paymentConfirm: true,
              })
            )
            // dispatch(setActiveStep(3))
          }}
        >
          Confirm the payment
        </button>
      </div>
    </div>
  )
}
