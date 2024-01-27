import { useAppDispatch } from "../../../hook"
import { IPaymentProps } from "../../types/data"

export const SepaPayment: React.FC<IPaymentProps> = ({
  finalPrice,
  orderId,
}) => {
  const dispatch = useAppDispatch()
  return (
    <div className='mx-auto'>
      <h1>Sepa Payment Details</h1>
      <div className='md:flex'>
        <div className='md:w-1/2'>
          <p className='opacity-70 text-sm mt-2'>Account number (IBAN)</p>
          <p className='font-semibold'>GB25CLJU00997181260932</p>
          <p className='opacity-70 text-sm mt-2'>BIC</p>
          <p className='font-semibold'>CLJUGB21</p>
          <p className='opacity-70 text-sm mt-2'>Account Holder Name</p>
          <p className='font-semibold'>MIROSHNYK NATALIIA</p>

          <p className='opacity-70 text-sm mt-2'>
            TIN (Taxpayer Identification Number)
          </p>
          <p className='font-semibold'>3542908885</p>
          <p className='opacity-70 text-sm mt-2'>Bank</p>
          <p className='font-semibold'>Clear Junction Limited</p>
          <p className='opacity-70 text-sm mt-2'>Bank address</p>
          <p className='font-semibold'>15 Kingsway, London WC2B 6UN</p>
          <p className='opacity-70 text-sm mt-2'>Amount</p>
          <p className='font-semibold'>{finalPrice} USD</p>
        </div>
        <div></div>
      </div>

    </div>
  )
}
