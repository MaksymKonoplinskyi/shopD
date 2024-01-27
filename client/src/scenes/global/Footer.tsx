// import { Instagram } from "../../assets/Instagram"

import { useNavigate } from "react-router-dom"
import { Instagram } from "../../assets/Instagram"
import { Pinterest } from "../../assets/Pinterest"
import { Telegram } from "../../assets/Telegram"
import { Whatsapp } from "../../assets/Whatsapp"

export function Footer() {
  const navigate = useNavigate()
  return (
    <div className=' mt-16  bg-gray-200'>
      <div className='container flex justify-between flex-col md:flex-row'>
        <div className="flex flex-col gap-8 text-center">
          <h4 className='font-bold mb-0 '>Terms & Conditions</h4>
          <p className=' cursor-pointer' onClick={() => navigate('/shippingPolicy')}>Shipping Policy</p>
          <p className=' cursor-pointer' onClick={() => navigate('/refundPolicy')}>Refund Policy</p>
        </div>

        <div className="flex flex-col  gap-8 text-center">
          <h4 className='font-bold mb-0'>Contact Us</h4>

          <div className='flex gap-12 justify-center'>
            <div className='gap-8'>
              <a
                className=''
                href='https://telegram.im/@Natalie_Kuklin'
                target='_blank'
              >
                <Telegram />
              </a>
            </div>
            <div className=''>
              <a href='https://wa.me/380954775627' target='_blank'>
                <Whatsapp />
              </a>
            </div>
          </div>
          <div >
            <a href='mailto:nataliekuklinart@gmail.com'>
              nataliekuklinart@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col  gap-8">
          <h4 className='font-bold mb-0'>Social Media</h4>
          <div className='flex gap-12 justify-center'>
            <div className='mb-8'>
              <a
                href='http://instagram.com/art_by_natalie_kuklin'
                target='_blank'
              >
                <Instagram />
              </a>
            </div>
            <a href='http://pin.it/KVfEs6P' target='_blank'>
              <Pinterest />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
