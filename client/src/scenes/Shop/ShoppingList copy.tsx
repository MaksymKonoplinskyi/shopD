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
import { useNavigate, useParams } from "react-router-dom"

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

  return (
    <div
      className='container'
    >
      <p className='text-center'>Who needs, they will buy</p>
      <Tabs
        textColor='primary'
        indicatorColor='primary'
        value={value}
        onChange={handleChange}
        centered
        // TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        // sx={{
        //   m: "25px",
        //   "& .MuiTabs-flexContainer": {
        //     flexWrap: "wrap",
        //   },
        //   },
        // }}
      >
        <Tab label='ALL' value='all' onClick={() => navigate(`shop/all`)} />
        <Tab label='nude' value='nude' onClick={() => navigate(`shop/nude`)} />
        <Tab label='abstract' value='abstract' onClick={() => navigate(`shop/abstract`)} />
        <Tab label='others' value='others' onClick={() => navigate(`shop/others`)} />
      </Tabs>
      <ProductSortedList items={items} sort={`${sort}`} />
    </div>
  )
}

export default ShoppingList
