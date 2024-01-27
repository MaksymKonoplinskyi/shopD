import React from "react"
import Box from "@mui/material/Box"
// import Item from "../../components/Item"
import { Product } from "../global/Product"
import useMediaQuery from "@mui/material/useMediaQuery"

import { IOriginItem } from "../../types/data"

interface IProductSortedListProps {
  items: IOriginItem[]
  sort: string
}

const ProductSortedList: React.FC<IProductSortedListProps> = ({
  items,
  sort,
}) => {
  const currentItems =
    sort === "all"
      ? items
      : items.filter(item => item.attributes.subject === sort)
  const breakPoint = useMediaQuery("(min-width:600px)")

  return (
    <div
      className='grid md:grid-cols-2 grid-cols-1 gap-8 xl:gap-10 place-content-between'
      // margin='0 auto'
      // display='grid'
      // gridTemplateColumns='repeat(auto-fill, 400px)'
      // justifyContent='space-around'
      // rowGap='20px'
      // columnGap='1.33%'
    >
      {currentItems.map(item => (
        <Product item={item} key={`${item.id}`} isTrack={false} />
      ))}
    </div>
  )
}

export default ProductSortedList
