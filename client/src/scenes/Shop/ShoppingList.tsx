import React, { useState } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useAppDispatch, useAppSelector } from "../../../hook"
import { fetchItems } from "../../redux/slices/origins"
import { IOriginItem } from "../../types/data"
import ProductSortedList from "./ProductSortedList"
import { Link, useNavigate, useParams } from "react-router-dom"

const ShoppingList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { sort } = useParams()
  const navigate = useNavigate()
  const [value, setValue] = useState(sort)
  const items: IOriginItem[] = useAppSelector(
    state => state.origins.originItems
  )
  const breakPoint = useMediaQuery("(min-width:600px)")
  // const { sort } = useParams()
  const handleChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => void = (event, newValue) => {
    setValue(newValue)
  }

  // async function getItems() {
  //   const items = await fetch(
  //     "http://localhost:1337/api/items?populate=mainPhoto",
  //     { method: "GET" }
  //   )

  //   const itemsJson = await items.json()
  //   console.log(itemsJson.data)
  //   dispatch(setItems(itemsJson.data))
  // }

  // useEffect(() => {
  //   dispatch(fetchItems())
  // }, [])

  // textColor='primary'
  //       indicatorColor='primary'
  //       value={value}
  //       onChange={handleChange}
  //       centered
  // TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
  // sx={{
  //   m: "25px",
  //   "& .MuiTabs-flexContainer": {
  //     flexWrap: "wrap",
  //   },
  //   },
  // }}

  return (
    <div className='container'>
      <p className='text-center mt-8 text-6xl'>Who needs, they will buy</p>
      <ul className='flex items-center justify-between max-w-md mx-auto'>
        <li className=' border-gray-400 my-8 uppercase cursor-pointer'>
          <p className='hover:text-gray-950' onClick={() => navigate(`/shop`)}>
            ALL
          </p>
        </li>
        <li className=' border-gray-400 my-8 uppercase cursor-pointer'>
          <p
            className='hover:text-gray-950'
            onClick={() => navigate(`/shop/nude`)}
          >
            nude
          </p>
        </li>
        <li className=' border-gray-400 my-8 uppercase cursor-pointer'>
          <p
            className='hover:text-gray-950'
            onClick={() => navigate(`/shop/abstract`)}
          >
            abstract
          </p>
        </li>
        <li className=' border-gray-400 my-8 uppercase cursor-pointer'>
          <p
            className='hover:text-gray-950'
            onClick={() => navigate(`/shop/others`)}
          >
            others
          </p>
        </li>
      </ul>

      <ProductSortedList items={items} sort={sort || "all"} />
    </div>
  )
}

export default ShoppingList
