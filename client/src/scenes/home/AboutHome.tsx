import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material"
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined"
import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../../hook"

import { fetchAboutHomeInfo } from "../../redux/slices/home"
import { useNavigate } from "react-router-dom"

export const AboutHome: React.FC = () => {
  // const [email, setEmail] = useState("")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAboutHomeInfo())
  }, [])
  const aboutHomeInfo = useAppSelector(
    state => state.home.aboutHomeInfo
  )

  return (
    <>
      <div className='flex justify-between gap-12'>
       
        <div className='w-1/3 my-auto'>
          <div className='mb-8'>
            <Typography variant='h3'>{aboutHomeInfo.title}</Typography>
          </div>
          <div className='mb-8'>
            <Typography>{aboutHomeInfo.text}</Typography>
          </div>
          <button
            className='bg-white border-black
                font-sans
                border text-black w-full cursor-pointer
                 text-sm tracking-widest font-[900]
                hover:bg-gray-200 hover:border-gray-200 h-14'
            onClick={() => navigate("about")}
          >
            Full story
          </button>
        </div>
        <div className='w-2/3'>
          <img
            src={aboutHomeInfo.photoUrl}
            alt={aboutHomeInfo.title}
            className='bg-gray-200 object-contain w-full h-full'
          />
        </div>
      </div>
    </>
  )
}
