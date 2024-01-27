import React from "react"

import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../hook"
import { IOriginItem } from "../../types/data"
import ProductDetails from "./ProductDetails"
import MayAlsoLike from "./MayAlsoLike"
import PhotoDetails from "./PhotoDetails"

const ProductDetailsPage: React.FC = () => {
  // { product, products }
  const { itemId } = useParams()
  // const itemId = useParams().itemId


  const items: IOriginItem[] = useAppSelector(
    state => state.origins.originItems
  )
  // const navigate = useNavigate()
  // if (!items.find(obj => obj.id == itemId)){
  //   navigate(`/`)
  // }
  const searchCurrentProductRes: IOriginItem | undefined = items.find(
    obj => obj.id === Number(itemId)
  )
  const currentProduct: IOriginItem = searchCurrentProductRes
    ? searchCurrentProductRes
    : items[0]

  let isPhotoDetailsOpen = useAppSelector(
    state => state.currentOrigin.isPhotoDetailsOpen
  )

  // const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()

  // const handleBuyNow = () => {
  // onAdd(product, qty)

  //   setShowCart(true)
  // }



  return (
    <>
      {isPhotoDetailsOpen && <PhotoDetails currentProduct={currentProduct} />}
      {!isPhotoDetailsOpen && currentProduct && (
        <ProductDetails currentProduct={currentProduct} />
      )}
      {!isPhotoDetailsOpen && items && <MayAlsoLike items={items} />}
    </>
  )
}

// export const getStaticPaths = async () => {
//   const query = `*[_type == "product"] {
//     slug {
//       current
//     }
//   }
//   `

// const products = await client.fetch(query)

//   const paths = products.map(product => ({
//     params: {
//       slug: product.slug.current,
//     },
//   }))

//   return {
//     paths,
//     fallback: "blocking",
//   }
// }

// export const getStaticProps = async ({ params: { slug } }) => {
//   const query = `*[_type == "product" && slug.current == '${slug}'][0]`
//   const productsQuery = '*[_type == "product"]'

//   const product = await client.fetch(query)
//   const products = await client.fetch(productsQuery)

//   //   console.log(product);

//   return {
//     props: { products, product },
//   }
// }

export default ProductDetailsPage
