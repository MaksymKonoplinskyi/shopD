import React, { Fragment} from "react"

import { useAppDispatch, useAppSelector } from "../../../hook"
import { IOriginItem } from "../../types/data"
import { addToCart, setIsCartOpen } from "../../redux/slices/cart"
import { Toaster } from "react-hot-toast"
import {
  setIsPhotoDetailsOpen,
  setNextPhotoNumber,
  setPrevPhotoNumber,
} from "../../redux/slices/currentOrigin"
import ArrowMiniIcon from "./MiniIcon"
import { useParams } from "react-router-dom"
import { Dialog, Transition } from "@headlessui/react"
import { ArrowLeftSvg } from "../../components/ArrowLeftSvg"

import { CrossSvg } from "../../components/CrossSvg"
import { ArrowRightSvg } from "../../components/ArrowRightSvg"

interface IPhotoDetailsProps {
  currentProduct: IOriginItem
}

const PhotoDetailsWithArrow: React.FC<IPhotoDetailsProps> = ({
  currentProduct,
}) => {
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
      <Transition.Root show={isPhotoDetailsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => dispatch(setIsPhotoDetailsOpen())}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex pl-0'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel
                    className='pointer-events-auto w-screen
                  '
                    as='div'
                  >
                    <div className=' h-full bg-white '>
                      <div className='flex justify-between'>
                        <div
                          className='my-auto p-4 cursor-pointer'
                          onClick={() => dispatch(setPrevPhotoNumber())}
                        >
                          <ArrowLeftSvg />
                        </div>
                        {/* https://codepen.io/ccrch/pen/yyaraz */}
                        <div className=' h-screen max-h-[85vw] aspect-square'>
                          <img
                            src={originImgUrls[chosenPhotoNumber]}
                            alt={currentProduct.attributes.name}
                            className='bg-gray-200 object-contain w-full h-full cursor-zoom-in'
                          />
                        </div>

                        <div className='flex content-between flex-col place-items-center'>
                          <div
                            className='cursor-pointer p-4 '
                            onClick={() => dispatch(setIsPhotoDetailsOpen())}
                          >
                            <CrossSvg />
                          </div>

                          <div
                            className='m-auto cursor-pointer p-4'
                            onClick={() => dispatch(setNextPhotoNumber())}
                          >
                            <ArrowRightSvg />
                          </div>

                          <div className='cursor-pointer  p-4'>
                            <p className='cursor-pointer'>{`${
                              chosenPhotoNumber + 1
                            } / ${originImgUrls.length}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default PhotoDetailsWithArrow
