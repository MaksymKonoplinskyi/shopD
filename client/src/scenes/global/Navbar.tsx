import { useAppDispatch, useAppSelector } from "../../../hook"
import { Link, useParams } from "react-router-dom"

import { useState } from "react"

import { setIsCartOpen } from "../../redux/slices/cart"
import { Logo } from "../../components/Logo"
import { Bag } from "../../components/Bag"

const Navbar: React.FC = () => {
  const carts = useAppSelector(state => state.cart.originsInCart)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { currentLink } = useParams()
  return (
    <>
      <header className='container py-4 border-b border-gray-400 overflow-hidden'>
        <div
          className={`inline-block bg-gray-800 bg-opacity-50 fixed w-full h-full right-0 top-0 
          transition-opacity ease-in-out duration-1000 overflow-hidden z-10
          ${isNavOpen ? "left-0 opacity-50" : " -left-full opacity-0"}
          `}
        />
        <div
          className={`fixed w-full h-full right-0 top-0 overflow-hidden transition-all 
          ease-in-out duration-1000 z-20 
            ${isNavOpen ? " left-0 " : " -left-full "}
          `}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <div className='relative flex h-full flex-col  w-5/6 max-w-md bg-white  '>
            <div className='CROSS-ICON pt-3 pl-2 cursor-pointer'>
              <svg
                className='h-10 w-10 text-gray-600'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </div>
            <nav className='MENU-LINK-MOBILE-OPEN mt-8'>
              <ul className='flex flex-col items-center  justify-between min-h-[250px] text-4xl'>
                <li className='border-b border-gray-400 my-8 uppercase'>
                  <Link to={"/"}>
                    <h3 className='hover:text-gray-950'>HOME</h3>
                  </Link>
                </li>
                <li className='border-b border-gray-400 my-8 uppercase'>
                  <Link  to={"/shop"}>
                    <h3 className={`hover:text-gray-950 }`}>SHOP</h3>
                  </Link>
                </li>
                <li className='border-b border-gray-400 my-8 uppercase'>
                  <Link to={"/about"}>
                    <h3 className='hover:text-gray-950'>ABOUT</h3>
                  </Link>
                </li>
                <li className='border-b border-gray-400 my-8 uppercase'>
                  <Link to={"/faq"}>
                    <h3 className='hover:text-gray-950'>FAQ</h3>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <section className='MOBILE-MENU flex items-center justify-between md:hidden'>
          <div
            className='HAMBURGER-ICON space-y-2'
            onClick={() => setIsNavOpen(prev => !prev)} // toggle isNavOpen state on click
          >
            <span className='block h-0.5 w-8  bg-gray-600'></span>
            <span className='block h-0.5 w-8  bg-gray-600'></span>
            <span className='block h-0.5 w-8  bg-gray-600'></span>
          </div>
          <a href='/' className=''>
            <Logo />
          </a>
          <div
            className='hover:opacity-50 cursor-pointer block'
            onClick={() => dispatch(setIsCartOpen())}
          >
            <Bag />
            <div className='absolute'>
              <p className='relative block left-5 bottom-10 bg-gray-100 w-5 h-5 text-center rounded-full'>
                {carts.length}
              </p>
            </div>
          </div>
        </section>
        <nav className=' '>
          <div className='DESKTOP-MENU hidden  md:flex justify-between items-center'>
            <a href='/' className=''>
              <Logo />
            </a>
            <div className=' tracking-widest'>
              <ul className=' flex items-center justify-between w-80 lg:w-96'>
                <li>
                  <Link to={"/"}>
                    <h5 className='hover:text-gray-400  '>HOME</h5>
                  </Link>
                </li>
                <li>
                  <Link to={"/shop"}>
                    <h5 className='hover:text-gray-400 '>SHOP</h5>
                  </Link>
                </li>
                <li>
                  <Link to={"/about"}>
                    <h5 className='hover:text-gray-400'>ABOUT</h5>
                  </Link>
                </li>
                <li>
                  <Link to={"/faq"}>
                    <h5 className='hover:text-gray-400'>FAQ</h5>
                  </Link>
                </li>
              </ul>
            </div>

            <h5
              className='hover:text-gray-400 cursor-pointer'
              onClick={() => dispatch(setIsCartOpen())}
            >
              {`Cart ( ${carts.length} )`}
            </h5>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
