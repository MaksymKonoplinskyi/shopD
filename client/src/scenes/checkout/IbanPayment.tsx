import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { setActiveStep } from "../../redux/slices/cart";
import { useAppDispatch } from "../../../hook";
import { IPaymentProps } from "../../types/data";


export const IbanPayment : React.FC<IPaymentProps> = ({finalPrice, orderId}) => {
  const dispatch = useAppDispatch()
  return (
    <div className="mx-auto">
     <h1>Iban Payment Details</h1> 
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
            // onClick={() => {
            // dispatch(addToCart(currentProduct))
            // dispatch(setIsCartOpen())
            // }}
          >
            Next
          </button>
        </div>
    </div>
  );
};
