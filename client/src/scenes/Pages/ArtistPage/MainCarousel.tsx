import { Box, Typography, IconButton, useMediaQuery } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useAppDispatch, useAppSelector } from '../../../../hook'
import { fetchCarousel } from '../../../redux/slices/carousel'
import { useEffect } from 'react'
import { ICarouselItem } from '../../../types/data'

const MainCarousel = () => {
  const dispatch = useAppDispatch()
  const carouselItems: ICarouselItem[] = useAppSelector(state => state.carousel.carouselItems)

  useEffect(() => {
    dispatch(fetchCarousel())
  }, [])

  const isNonMobile = useMediaQuery('(min-width:600px)')
  return (
    <div className=''>
      <Carousel
        infiniteLoop={true}
        showThumbs={false}
        // showIndicators={false}
        showStatus={false}
        autoPlay={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '0',
              color: 'white',
              padding: '5px',
              zIndex: '10',
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: 'absolute',
              top: '50%',
              right: '0',
              color: 'white',
              padding: '5px',
              zIndex: '10',
            }}
          >
            <NavigateNextIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
      >
        {carouselItems.map((item, index) => (
          <div className=' ' key={`carousel-image-${index}`}>
            <img
              className='h-screen'
              // src={item.attributes.photo.data.attributes.formats.large.url}
              src={item.attributes.photo.data.attributes.url}
              alt={`carousel-${index}`}
              style={{
                width: '100%',
                height: '94vh',
                objectFit: 'cover',
                backgroundAttachment: 'fixed',
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MainCarousel
