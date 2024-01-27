import React from "react"

import { useAppDispatch, useAppSelector } from "../../../hook"
import { IOriginItem } from "../../types/data"
import { addToCart, setIsCartOpen } from "../../redux/slices/cart"
import { Toaster } from "react-hot-toast"
import {
  setChosenPhotoNumber,
  setIsPhotoDetailsOpen,
  setNextPhotoNumber,
  setPrevPhotoNumber,
} from "../../redux/slices/currentOrigin"
// import ArrowMiniIcon from "./MiniIcon"
// import { useParams } from "react-router-dom"
// import { Dialog, Transition } from "@headlessui/react"
// import { ArrowLeftSvg } from "../../components/ArrowLeftSvg"
// import { ArrowRightSvg } from "../global/ArrowRightSvg"
import { CrossSvg } from "../../components/CrossSvg"

interface IPhotoDetailsProps {
  currentProduct: IOriginItem
}

const PhotoDetails: React.FC<IPhotoDetailsProps> = ({ currentProduct }) => {
  const dispatch = useAppDispatch()
  //   const { itemId } = useParams()
  //   const thumbnailImgUrls = currentProduct.allPhotos.map(
  //     item => item.thumbnail.url
  //   )

  const isPhotoDetailsOpen = useAppSelector(
    state => state.currentOrigin.isPhotoDetailsOpen
  )
  const originImgUrls = currentProduct.allPhotos.map(item => item.origin.url)
  const smallImgUrls = currentProduct.allPhotos.map(item => item.small.url)

  const chosenPhotoNumber: number = useAppSelector(
    state => state.currentOrigin.chosenPhotoNumber
  )

  return (
    <>
      <div
        className='cursor-zoom-out w-screen absolute'
        onClick={() => dispatch(setIsPhotoDetailsOpen())}
      >
        <div className=''>
          {originImgUrls.map((itemUrl, i) => (
            <div key={i + itemUrl} className='mx-auto mb-4 aspect-square'>
              <img
                src={itemUrl}
                alt={currentProduct.attributes.name}
                className='bg-gray-200 object-contain w-full'
              />
            </div>
          ))}
        </div>
        <div className='flex content-between flex-col place-items-center relative'>
          <div className='cursor-pointer p-4 '>
            <CrossSvg />
          </div>
        </div>
      </div>
    </>
  )
}

export default PhotoDetails
