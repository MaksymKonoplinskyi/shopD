import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import ky from "ky"
import { ICarouselItem } from "../../types/data"

const api = ky.create({
  prefixUrl: import.meta.env.VITE_REACT_APP_API_URL + '/api/'
})

export const fetchCarousel = createAsyncThunk<
ICarouselItem[],
  void,
  { rejectValue: string }
>("carousel/fetchCarousel", async (_, { rejectWithValue }) => {
  try {
    const { data }: any = await api
      .get(`carousel-items?populate=photo`)
      .json()
    return data as ICarouselItem[]
  } catch (err: any) {
    console.log(err)
    return rejectWithValue(err)
  }
})

type CarouselState = {
  carouselItems: ICarouselItem[]
  isLoading: boolean
  error: string | null
}

const initialState: CarouselState = {
  carouselItems: [],
  isLoading: false,
  error: null,
}

export const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    setCarousel: (state, action: PayloadAction<ICarouselItem[]>) => {
      state.carouselItems = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCarousel.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCarousel.fulfilled, (state, action) => {
        state.carouselItems = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchCarousel.rejected, state => {
        state.carouselItems = []
        state.isLoading = false
        state.error = "error"
      })
  },
})

export const {
  setCarousel,
} = carouselSlice.actions

export const carouselReducer = carouselSlice.reducer
