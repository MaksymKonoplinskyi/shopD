import React from "react"
import { Link, useNavigate } from "react-router-dom"
// import Link from "next/link"

import { IOriginItem } from "../../types/data"
interface IItemProps {
  item: IOriginItem
  isTrack: boolean
  // width:string
}

export const Product: React.FC<IItemProps> = ({ item, isTrack }) => {
  const { price, name } = item.attributes
  const url = item.allPhotos[0].small.url
  const hurl = item.allPhotos[1].small.url
  const navigate = useNavigate()

  return (
    <>
      <div
        className={`cursor-pointer 
        text-center
        ${isTrack ? "w-80" : "  "} 
        `}
        onClick={() => navigate(`/item/${item.id}`)}
      >
        <div
          // className='product-image-container'
          className={` relative 
           bg-gray-100
           overflow-hidden 
           ${isTrack ? "w-80 h-80" : " aspect-square"} 
          `}
        >
          <img
            src={hurl}
            className='
            object-cover absolute top-0
             left-0 
             w-full h-full
             my-transition
             '

            // className=' object-contain bg-black'
          />

          <img
            src={url}
            // width={300}
            // height={300}
            // className='product-image'
            className='object-contain 
              w-full h-full'
          />
          {item.attributes.status === 'sold' && <div className='absolute top-4 right-4 bg-white p-1'>
            <p className='text-xl'>SOLD</p>
          </div>}
          {item.attributes.status === 'booked' && <div className='absolute top-4 right-4 bg-white p-1'>
            <p className='text-xl'>BOOKED</p>
          </div>}
        </div>
        <p className='mt-5 text-2xl font-medium truncate'>
          {name.toLocaleUpperCase()}
        </p>
        <p className='mt-1 text-gray-600'>${price}</p>
      </div>
    </>
  )
}

// export default Product
