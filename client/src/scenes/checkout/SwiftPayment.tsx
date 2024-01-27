import { useAppDispatch } from "../../../hook"
import { IPaymentProps } from "../../types/data"

export const SwiftPayment: React.FC<IPaymentProps> = ({
  finalPrice,
  orderId,
}) => {
  const dispatch = useAppDispatch()
  return (
    <div className='mx-auto'>
      <h1>Swift Payment Details</h1>
      <div className='md:flex'>
        <div className='md:w-1/2'>
          <p className='text-2xl font-bold mb-2'>Beneficiary</p>
          <p className='opacity-70 text-sm mt-2'>IBAN</p>
          <p className='font-semibold'>UA813220010000026200316675300</p>
          <p className='opacity-70 text-sm mt-2'>Account No</p>
          <p className='font-semibold'>26200316675300</p>
          <p className='opacity-70 text-sm mt-2'>Receiver</p>
          <p className='font-semibold'>
            MIROSHNYK NATALIIA, 01001, Ukraine, c. Kyiv, st. Lisova, build. 13A,
            fl. 6
          </p>
          <div className='border-b my-4 ' />
          <p className='text-2xl font-bold mb-2'>Account with Institution</p>
          <p className='opacity-70 text-sm mt-2'>Bank</p>
          <p className='font-semibold'>JSC UNIVERSAL BANK</p>
          <p className='opacity-70 text-sm mt-2'>City</p>
          <p className='font-semibold'>KYIV, UKRAINE</p>
          <p className='opacity-70 text-sm mt-2'>Swift code</p>
          <p className='font-semibold'>UNJSUAUKXXX</p>
          <div className='border-b my-4 ' />
          <p className='text-2xl font-bold mb-2'>Details of payment</p>
          <p className='font-semibold'>
            - private transfer <b>{orderId}</b>
          </p>
          <p className='opacity-70 text-sm mt-2'>Amount</p>
          <p className='font-semibold'>{finalPrice} USD</p>
        </div>
        <div></div>
      </div>
    </div>
  )
}
