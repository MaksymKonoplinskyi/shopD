import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  ICreateOrderResponse,
  IDataForOrderCreate,
  IDataForOrderUpdate,
  IOriginItem,
  IPromo,
  IUpdateOrderResponse,
  ShippingAddress,
} from "../../types/data"
import { toast } from "react-hot-toast"
import ky from "ky"

const api = ky.create({
  prefixUrl: import.meta.env.VITE_REACT_APP_API_URL + "/api/",
})

// interface ICreateOrderResponse {
//   success: boolean
//   orderId: string
//   message?: string
// }

// interface ICreateOrderData {
//   userEmail: string
//   orderProducts: IOrderProduct[]
//   promoCode?: string
//   totalPrise: number
// }

// interface IOrderProduct {
//   original: {
//     id: string
//     name: string
//     price: string
//   }
// }

export const fetchCreateOrder = createAsyncThunk<
  string,
  IDataForOrderCreate,
  { rejectValue: string }
>("cart/fetchCreateOrder", async (dataForOrderCreate, { rejectWithValue }) => {
  try {
    const { data }: { data: ICreateOrderResponse } = await api
      .post(`orders`, {
        json: { data: { ...dataForOrderCreate } },
      })
      .json()
    // console.log(data)

    return data.id as string
  } catch (err: any) {
    const error = err.response ? err.response.data.message : err.message
    console.log(error)
    return rejectWithValue(error)
  }
})
export const fetchUpdateOrder = createAsyncThunk<
  string,
  IDataForOrderUpdate,
  { rejectValue: string }
>("cart/fetchUpdateOrder", async (dataForOrderUpdate, { rejectWithValue }) => {
  try {
    const { data }: { data: IUpdateOrderResponse } = await api
      .put(`orders/${dataForOrderUpdate.orderId}`, {
        json: { data: { ...dataForOrderUpdate } },
      })
      .json()
    console.log(data)

    return data.id as string
  } catch (err: any) {
    const error = err.response ? err.response.data.message : err.message
    console.log(error)
    return rejectWithValue(error)
  }
})
// export const fetchShippingAddressUpdate = createAsyncThunk<
//   string,
//   IShippingAddressUpdate,
//   { rejectValue: string }
// >("cart/fetchShippingAddressUpdate", async (dataShippingAddressUpdate, { rejectWithValue }) => {
//   try {
//     const { data }: { data: IUpdateOrderResponse } = await api
//       .put(`orders/${dataShippingAddressUpdate.orderId}`, {
//         json: { data: { ...dataShippingAddressUpdate.shippingAddress } },
//       })
//       .json()
//     console.log(data)

//     return data.id as string
//   } catch (err: any) {
//     const error = err.response ? err.response.data.message : err.message
//     console.log(error)
//     return rejectWithValue(error)
//   }
// })

interface ICheckPromoResponseItem {
  attributes: {
    promoCode: string
    discount: number
  }
}
interface ICheckPromoResData {
  data: ICheckPromoResponseItem[]
}

export const fetchCheckPromo = createAsyncThunk<
  IPromo,
  string,
  { rejectValue: string }
>("cart/fetchCheckPromo", async (promoCode, { rejectWithValue }) => {
  try {
    const resData: ICheckPromoResData = await api.get(`promos`).json()
    const promo = resData.data.find(
      item => item.attributes.promoCode === promoCode
    )
    return {
      promoCode,
      discount: promo?.attributes.discount ? promo?.attributes.discount : 0,
      isCorrect: promo !== undefined,
    }
  } catch (err: any) {
    console.log(err)
    return rejectWithValue(err)
  }
})

type CartState = {
  isCartOpen: boolean
  originsInCart: IOriginItem[]
  totalPrice: number
  totalPriceWithDiscount: number
  promo: IPromo
  activeStep: number
  userEmail: string
  rememberMe: boolean
  orderId: string
  shippingAddress: ShippingAddress
  paymentMethod: string
  paymentConfirm: boolean
  // originItems: IOriginItem[]
  error: string | null
}

const initialState: CartState = {
  isCartOpen: false,
  originsInCart: [],
  totalPrice: 0,
  totalPriceWithDiscount: 0,
  promo: {
    promoCode: "",
    discount: 0,
    isCorrect: null,
  },
  activeStep: 0,
  userEmail: "",
  rememberMe: true,
  orderId: "",
  shippingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
  paymentMethod: "",
  paymentConfirm: false,
  error: "",
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IOriginItem>) => {
      const checkProductInCart = state.originsInCart.find(
        item => item.id === action.payload.id
      )
      if (checkProductInCart) {
        toast("Already in the cart", {
          icon: "👉🏻",
        })
      } else {
        state.originsInCart = [...state.originsInCart, action.payload]
        // state.totalPrice = state.originsInCart.reduce(
        //   (total: number, item: IOriginItem) => {
        //     return total + item.attributes.price
        //   },
        //   0
        // )
        // state.totalPriceWithDiscount = state.promo.discount
        //   ? state.totalPrice * (1 - state.promo.discount * 0.01)
        //   : state.totalPrice
        localStorage.setItem("cartItems", JSON.stringify(state.originsInCart))
        // toast.success(`${action.payload.attributes.name} added to the cart.`)
        toast.success("Added to cart", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#2e8c30",
            secondary: "#FFFAEE",
          },
        })
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.originsInCart = state.originsInCart.filter(
        item => item.id !== action.payload
      )
      // state.totalPrice = state.originsInCart.reduce(
      //   (total: number, item: IOriginItem) => {
      //     return total + item.attributes.price
      //   },
      //   0
      // )
      // state.totalPriceWithDiscount = state.promo.discount
      //   ? state.totalPrice * (1 - state.promo.discount * 0.01)
      //   : state.totalPrice
      localStorage.setItem("cartItems", JSON.stringify(state.originsInCart))
      // localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice))
      // localStorage.setItem("totalPriceWithDiscount", JSON.stringify(state.totalPriceWithDiscount))
    },

    // increaseCount: (state, action: PayloadAction<string>) => {
    //   state.originsInCart = state.originsInCart.map((item) => {
    //     if (item.id === action.payload) {
    //       item.count++;
    //     }
    //     return item;
    //   });
    // },

    // decreaseCount: (state, action: PayloadAction<string>) => {
    //   state.originsInCart = state.originsInCart.map((item) => {
    //     if (item.item.id === action.payload && item.count > 1) {
    //       item.count--;
    //     }
    //     return item;
    //   });
    // },

    setIsCartOpen: state => {
      state.isCartOpen = !state.isCartOpen
    },
    setCartItems: (state, action: PayloadAction<IOriginItem[]>) => {
      state.originsInCart = action.payload
      state.totalPrice = state.originsInCart.reduce(
        (total: number, item: IOriginItem) => {
          return total + item.attributes.price
        },
        0
      )
      state.totalPriceWithDiscount = state.promo.discount
        ? state.totalPrice * (1 - state.promo.discount * 0.01)
        : state.totalPrice
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload
    },
    // setTotalPrice: (state, action: PayloadAction<number>) => {
    //   const totalPrice = state.originsInCart.reduce((total: number, item: IOriginItem) => {
    //     return total + item.attributes.price
    //   }, 0)
    //   state.totalPrice = totalPrice
    // },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload
      if (state.rememberMe) {
        localStorage.setItem("userEmail", JSON.stringify(state.userEmail))
      } else {
        localStorage.setItem("userEmail", JSON.stringify(""))
      }
    },

    setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload
      if (state.rememberMe) {
        localStorage.setItem(
          "shippingAddress",
          JSON.stringify(state.shippingAddress)
        )
      } else {
        localStorage.setItem("shippingAddress", JSON.stringify(""))
      }
    },

    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload
      if (state.rememberMe) {
        localStorage.setItem(
          "paymentMethod",
          JSON.stringify(state.paymentMethod)
        )
      } else {
        localStorage.setItem("paymentMethod", JSON.stringify(""))
      }
    },
    setPaymentConfirm: (state, action: PayloadAction<boolean>) => {
      state.paymentConfirm = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCreateOrder.pending, state => {
        state.error = null
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.orderId = action.payload
        localStorage.setItem("orderId", JSON.stringify(state.orderId))
        state.error = null
      })
      .addCase(fetchCreateOrder.rejected, state => {
        state.error = "create order error"
      })

      .addCase(fetchUpdateOrder.pending, state => {
        state.error = null
      })
      .addCase(fetchUpdateOrder.fulfilled, (state, action) => {
        state.orderId = action.payload
        localStorage.setItem("orderId", JSON.stringify(state.orderId))
        state.error = null
      })
      .addCase(fetchUpdateOrder.rejected, state => {
        state.error = "create order error"
      })

      .addCase(fetchCheckPromo.pending, state => {
        state.error = null
      })
      .addCase(fetchCheckPromo.fulfilled, (state, action) => {
        state.promo = action.payload
        state.error = null
        localStorage.setItem("promo", JSON.stringify(state.promo))
      })
      .addCase(fetchCheckPromo.rejected, state => {
        state.error = "Apply promo error"
      })
  },
})

export const {
  addToCart,
  removeFromCart,
  // setTotalPrice,
  // increaseCount,
  // decreaseCount,
  setIsCartOpen,
  setCartItems,
  setUserEmail,
  setRememberMe,
  setShippingAddress,
  setActiveStep,
  setPaymentMethod,
  setPaymentConfirm,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
