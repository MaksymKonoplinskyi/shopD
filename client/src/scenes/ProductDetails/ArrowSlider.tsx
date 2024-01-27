import React from "react"

import { useAppDispatch, useAppSelector } from "../../../hook"
import { IPhotoFormats } from "../../types/data"
import { setNextPhotoNumber, setPrevPhotoNumber } from "../../redux/slices/currentOrigin"
import { ArrowLeftSvg } from "../../components/ArrowLeftSvg"
import { ArrowRightSvg } from "../../components/ArrowRightSvg"

interface IArrowMiniIconProps {
  allPhotos: IPhotoFormats[]
}

export const ArrowSlider: React.FC<IArrowMiniIconProps> = ({ allPhotos }) => {
  const dispatch = useAppDispatch()

  let chosenPhotoNumber: number = useAppSelector(
    state => state.currentOrigin.chosenPhotoNumber
  )

  return (
    <div className='flex  mt-4 justify-between w-32 mx-auto'>
      <div className='bg-gray-100 rounded-full cursor-pointer w-8 h-8'
        onClick={() => dispatch(setPrevPhotoNumber())}>
        <div className=""><ArrowLeftSvg /></div>
        
      </div>

      <p className='my-auto text-2xl'>
        {chosenPhotoNumber + 1 + " / " + allPhotos.length}
      </p>
      <div className="bg-gray-100 rounded-full cursor-pointer"
      onClick={() => dispatch(setNextPhotoNumber())}><ArrowRightSvg /></div>
      
    </div>
  )
}
