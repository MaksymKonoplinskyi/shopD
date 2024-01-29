import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './scenes/home/Home'
import Navbar from './scenes/global/Navbar'
import { Footer } from './scenes/global/Footer'
// import ItemDetails from "./scenes/itemDetails000/ItemDetails";
import { Checkout } from './scenes/checkout/Checkout'
import './styles/globals.css'
import ProductDetailsPage from './scenes/ProductDetails/ProductDetailsPage'
import ShoppingList from './scenes/Shop/ShoppingList'
import Cart from './scenes/global/Cart'
import { useAppDispatch } from '../hook'
import { fetchItems } from './redux/slices/origins'
import { IOriginItem } from './types/data'
import { setCartItems, setUserEmail } from './redux/slices/cart'
import { fetchHomeItems } from './redux/slices/home'
import { CollaborationPage } from './scenes/Collaboration/CollaborationPage'
import { AboutPage } from './scenes/Pages/AboutPage'
import { FAQPage } from './scenes/Pages/FAQPage'
import { ShippingPolicyPage } from './scenes/Pages/ShippingPolicyPage'
import { RefundPolicyPage } from './scenes/Pages/RefundPolicyPage'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // При загрузке страницы извлекаем данные из localStorage
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as IOriginItem[]
    dispatch(setCartItems(savedCartItems))
  }, [])

  useEffect(() => {
    dispatch(fetchItems())
    dispatch(fetchHomeItems())
  }, [])

  return (
    <div className='m-auto font-sans'>
      <BrowserRouter>
        <Navbar />

        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='shop' element={<ShoppingList />} />
          <Route path='shop/:sort' element={<ShoppingList />} />
          <Route path='item/:itemId' element={<ProductDetailsPage />} />
          <Route path='checkout' element={<Checkout />} />
          {/* <Route path='checkout/success' element={<Confirmation />} /> */}
          <Route path='collaboration' element={<CollaborationPage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='faq' element={<FAQPage />} />
          <Route path='shippingPolicy' element={<ShippingPolicyPage />} />
          <Route path='refundPolicy' element={<RefundPolicyPage />} />
        </Routes>
        <Cart />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
