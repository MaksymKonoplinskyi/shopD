import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import ky from "ky"
import { IOriginItem, IPhotoFormats } from "../../types/data"

const api = ky.create({
  prefixUrl: import.meta.env.VITE_REACT_APP_API_URL + "/api/",
})

export const fetchItems = createAsyncThunk<
  IOriginItem[],
  void,
  { rejectValue: string }
>("origins/fetchItems", async (_, { rejectWithValue }) => {
  try {
    const res: any = await api.get(`items?populate=*`).json()
    const data = res.data as IOriginItem[]
    const dataWithPhotos = data.map(item => {
      // const originPhotoUrl: string =
      // item.attributes.mainPhoto.data.attributes.url
      const mainPhotoF: IPhotoFormats = {
        ...item.attributes.mainPhoto.data.attributes.formats,
        origin: item.attributes.mainPhoto.data.attributes,
      }

      const interiorPhotoF: IPhotoFormats = {
        ...item.attributes.interiorPhoto.data.attributes.formats,
        origin: item.attributes.interiorPhoto.data.attributes,
      }

      const photosFA: IPhotoFormats[] = item.attributes.photos.data.map(arg => {
        return { ...arg.attributes.formats, origin: arg.attributes }
      })
      const allPhotos: IPhotoFormats[] = [
        mainPhotoF,
        interiorPhotoF,
        ...photosFA,
      ]
      return { ...item, allPhotos }
    })

    return dataWithPhotos as IOriginItem[]
  } catch (err: any) {
    console.log(err)
    return rejectWithValue(err)
  }
})

type OriginState = {
  originItems: IOriginItem[]
  isLoading: boolean
  error: string | null
}

const initialState: OriginState = {
  originItems: [],
  isLoading: false,
  error: null,
}

export const originsSlice = createSlice({
  name: "origins",
  initialState,
  reducers: {
    // setItems: (state, action: PayloadAction<IOriginItem[]>) => {
    //   state.originItems = action.payload
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.originItems = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchItems.rejected, state => {
        // state.originItems = []
        state.isLoading = false
        state.error = "error"
      })
  },
})

// export const { setItems } = originsSlice.actions

export const originsReducer = originsSlice.reducer
