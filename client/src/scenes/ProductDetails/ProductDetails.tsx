import React, { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../hook"
import { IOriginItem } from "../../types/data"
import { addToCart, setIsCartOpen } from "../../redux/slices/cart"
import { Toaster } from "react-hot-toast"
import {
  setChosenPhotoNumber,
  setCurrentOriginData,
  setIsPhotoDetailsOpen,
} from "../../redux/slices/currentOrigin"

import { useParams } from "react-router-dom"
import PhotoDetails from "./PhotoDetails"
import MiniIcon from "./MiniIcon"
import { ArrowSlider } from "./ArrowSlider"

interface IProductDetailsProps {
  currentProduct: IOriginItem
}

const ProductDetails: React.FC<IProductDetailsProps> = ({ currentProduct }) => {
  const dispatch = useAppDispatch()
  const { itemId } = useParams()
  // const thumbnailImgUrls = currentProduct.allPhotos.map(
  //   item => item.thumbnail.url
  // )
  const smallImgUrls = currentProduct.allPhotos.map(item => item.small.url)

  let chosenPhotoNumber: number = useAppSelector(
    state => state.currentOrigin.chosenPhotoNumber
  )
  // let isPhotoDetailsOpen = useAppSelector(
  //   state => state.currentOrigin.isPhotoDetailsOpen
  // )

  useEffect(() => {
    dispatch(setChosenPhotoNumber(0))
    dispatch(setCurrentOriginData(currentProduct))
  }, [itemId])
  const buttonTitle =
    currentProduct.attributes.status === "in stock"
      ? "ADD TO CART"
      : currentProduct.attributes.status.toUpperCase()
  return (
    <>
      <div className='container mt-4'>
        <div className='md:flex  justify-between'>
          <div className='max-w-2xl md:w-7/12 aspect-square relative'>
            <img
              src={smallImgUrls[chosenPhotoNumber]}
              alt={currentProduct.attributes.name}
              className='bg-gray-200 object-contain w-full h-full cursor-zoom-in'
              onClick={() => dispatch(setIsPhotoDetailsOpen())}
            />
            {currentProduct.attributes.status === "sold" && (
              <div className='absolute top-4 right-4 bg-white p-1'>
                <p className='text-xl'>SOLD</p>
              </div>
            )}
            {currentProduct.attributes.status === "booked" && (
              <div className='absolute top-4 right-4 bg-white p-1'>
                <p className='text-xl'>BOOKED</p>
              </div>
            )}

            <div className='hidden md:block '>
              <MiniIcon allPhotos={currentProduct.allPhotos} />
            </div>
            <div className='md:hidden'>
              <ArrowSlider allPhotos={currentProduct.allPhotos} />{" "}
            </div>
          </div>

          <div className=' block md:m-auto md:w-5/12 mt-12  md:ml-10'>
            <div className='  '>
              <h1 className='font-header text-4xl mx-auto'>
                {currentProduct.attributes.name}
              </h1>
              <div className='text-sm'>
                <p>
                  {currentProduct.attributes.height +
                    "x" +
                    currentProduct.attributes.wight +
                    "  cm"}
                </p>
                <p>{currentProduct.attributes.medium}</p>
                <p>{currentProduct.attributes.material}</p>
                <p>{currentProduct.attributes.subject}</p>
                <p>{currentProduct.attributes.description}</p>
              </div>
              <p className='text-lg'>${currentProduct.attributes.price}</p>

              <div className='w-full'>
                <button
                  type='button'
                  disabled={Boolean(currentProduct.attributes.status === "sold" || currentProduct.attributes.status === "booked")}
                  className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer 
                disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200
                mt-10 py-3 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 '
                  onClick={() => {
                    dispatch(addToCart(currentProduct))
                    dispatch(setIsCartOpen())
                  }}
                >
                  <p>{buttonTitle}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
