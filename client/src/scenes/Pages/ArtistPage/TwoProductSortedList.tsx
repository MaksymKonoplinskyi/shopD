import React from 'react'

// import Item from "../../components/Item"
import { Product } from '../../global/Product'
// import useMediaQuery from "@mui/material/useMediaQuery"

import { IOriginItem } from '../../../types/data'
import { useNavigate } from 'react-router-dom'

interface ITwoProductSortedListProps {
  title: string
  items: IOriginItem[]
  sort: string
  firstItemId?: number
  secondItemId?: number
}

export const TwoProductSortedList: React.FC<ITwoProductSortedListProps> = ({ title, items, sort, firstItemId, secondItemId }) => {
  const currentItems = sort === 'all' ? items : items.filter(item => item.attributes.subject === sort)
  // const breakPoint = useMediaQuery("(min-width:600px)")
  const firstItem = currentItems.find(el => el.id === firstItemId) || currentItems[currentItems.length - 1] || null
  const secondItem = currentItems.find(el => el.id === secondItemId) || currentItems[currentItems.length - 2] || null
  const navigate = useNavigate()
  return (
    <>
      <h2 className='hover:text-gray-400 cursor-pointer' onClick={() => navigate(`shop/${sort}`)}>
        {title}
      </h2>
      <div className='grid grid-cols-2 gap-8 xl:gap-10 place-content-between'>
        {firstItem && <Product item={firstItem} key={`${firstItem.id}`} isTrack={false} />}
        {secondItem && <Product item={secondItem} key={`${secondItem.id}`} isTrack={false} />}
      </div>
      <button className='block mx-auto mt-8' onClick={() => navigate(`/shop/${sort}`)}>
        <h5 className='hover:text-gray-400 cursor-pointer'>
          VIEW MORE<span> &rarr;</span>
        </h5>
      </button>
    </>
  )
}
