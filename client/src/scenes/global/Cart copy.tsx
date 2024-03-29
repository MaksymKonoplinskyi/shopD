import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useAppDispatch, useAppSelector } from "../../../hook"
import { Link, useNavigate } from "react-router-dom"
import { IOriginItem } from "../../types/data"
import { removeFromCart, setIsCartOpen } from "../../redux/slices/cart"

export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cartItems: IOriginItem[] = useAppSelector(
    state => state.cart.originsInCart
  )
  const isCartOpen = useAppSelector(state => state.cart.isCartOpen)

  const totalPrice = cartItems.reduce((total: number, item: IOriginItem) => {
    return total + item.attributes.price
  }, 0)

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => dispatch(setIsCartOpen())}
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
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-xl '>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto pt-12 px-3 sm:px-16'>
                      <div className=' place-items-center'>
                        <Dialog.Title className='text-3xl text-center text-black font-header'>
                          SHOPPING BAG
                        </Dialog.Title>
                      </div>

                      <div className='mt-12 font-sans'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='
                            -my-9 
                            divide-y divide-gray-200'
                          >
                            {cartItems.map(item => (
                              <li key={item.id} className='flex py-9'>
                                <div className='h-32 w-32 flex-shrink-0 overflow-hidden'>
                                  <img
                                    src={item.allPhotos[0].small.url}
                                    alt={item.attributes.name}
                                    className='h-full w-full object-cover object-center
                                    cursor-pointer'
                                    onClick={() => {
                                      navigate(`/item/${item.id}`)
                                      dispatch(setIsCartOpen())
                                    }}
                                  />
                                </div>

                                <div className='ml-7 flex flex-1 flex-col'>
                                  <div className='my-auto '>
                                    <div className='flex justify-between  font-medium text-gray-900'>
                                      <p
                                        className='cursor-pointer font-black'
                                        onClick={() => {
                                          navigate(`/item/${item.id}`)
                                          dispatch(setIsCartOpen())
                                        }}
                                      >
                                        {item.attributes.name}
                                      </p>

                                      <div className=' flex items-center'>
                                        <button
                                          type='button'
                                          className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                                          onClick={() =>
                                            dispatch(removeFromCart(item.id))
                                          }
                                        >
                                          {/* <span className='sr-only'>
                                            Close panel
                                          </span> */}
                                          <XMarkIcon
                                            className='h-5 w-5'
                                            aria-hidden='true'
                                          />
                                        </button>
                                      </div>
                                    </div>
                                    <p className='mt-2 text-sm'>
                                      {item.attributes.height +
                                        " x " +
                                        item.attributes.wight +
                                        " cm"}
                                    </p>
                                    <p className='mt-2 '>
                                      {"$" + item.attributes.price}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500'>
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div
                        className='mt-6 cursor-pointer'
                        onClick={() => {
                          navigate(`/checkout`)
                          dispatch(setIsCartOpen())
                        }}
                      >
                        <p
                          // href='#'
                          className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                        >
                          Checkout
                        </p>
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                        <span >or </span>
                          <button
                            type='button'
                            className='font-medium text-indigo-600 hover:text-indigo-500'
                            onClick={() => dispatch(setIsCartOpen())}
                          >
                            Continue Shopping
                            <span> &rarr;</span>
                          </button>
                        </p>
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
  )
}
