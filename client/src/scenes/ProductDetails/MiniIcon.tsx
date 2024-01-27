import React from "react"

import { useAppDispatch, useAppSelector } from "../../../hook"
import { IOriginItem, IPhotoFormats } from "../../types/data"
import { setChosenPhotoNumber } from "../../redux/slices/currentOrigin"

interface IArrowMiniIconProps {
  allPhotos: IPhotoFormats[]
}

const ArrowMiniIcon: React.FC<IArrowMiniIconProps> = ({ allPhotos }) => {
  const dispatch = useAppDispatch()

  const thumbnailImgUrls = allPhotos.map(item => item.thumbnail.url)

  let chosenPhotoNumber: number = useAppSelector(
    state => state.currentOrigin.chosenPhotoNumber
  )

  return (
    <div
      className={
        thumbnailImgUrls.length < 7
          ? " flex  mt-4 justify-start gap-4 w-[620]"
          : " flex  mt-2 justify-between gap-2 w-[620]"
      }
    >
      {thumbnailImgUrls.map((url, i) => (
        <div
          key={i}
          className={
            i === chosenPhotoNumber
              ? " w-[11vw] md:w-[6vw] aspect-square bg-gray-200 scale-75 duration-500"
              : " w-[11vw] md:w-[6vw] aspect-square bg-gray-200 "
          }
        >
          <img
            key={i}
            src={url}
            alt={url}
            className={ 
              i === chosenPhotoNumber
                ?'m-auto object-contain h-full cursor-pointer  '
                :'m-auto object-contain  h-full cursor-pointer '
            }
            // i === chosenPhotoNumber ? " object-contain w-full h-full cursor-pointer scale-100 " : "object-contain w-full h-full cursor-pointer scale-100"

            onMouseEnter={() => {
              dispatch(setChosenPhotoNumber(i))
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default ArrowMiniIcon
