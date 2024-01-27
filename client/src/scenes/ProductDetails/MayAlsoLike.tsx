import React from "react"
import { Product } from "../global/Product"
import { IOriginItem } from "../../types/data"

interface IMayAlsoLikeProps {
  items: IOriginItem[]
}

const MayAlsoLike: React.FC<IMayAlsoLikeProps> = ({ items }) => {
  return (
    <div>
      <div className='mt-32'>
        <h2 className='text-center text-3xl mb-12'>You may also like</h2>
        <div className='h-[440px] relative w-full overflow-x-hidden'>
          <div
            className=' track
          flex justify-center gap-4 
          absolute whitespace-nowrap will-change-transform 
          animate-[wiggle_1s_ease-in-out_infinite]
          // animate-spin
          '
          >
            {items.map(item => (
              <Product key={item.id} item={item} isTrack={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MayAlsoLike
