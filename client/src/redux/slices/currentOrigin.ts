import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import ky from "ky"
import { IOriginItem } from "../../types/data"

// const api = ky.create({
//    prefixUrl: import.meta.env.VITE_REACT_APP_API_URL + '/api/'
//  })

// export const fetchItems = createAsyncThunk<
//   IOriginItem[],
//   void,
//   { rejectValue: string }
// >("origins/fetchItems", async (_, { rejectWithValue }) => {
//   try {
//     const { data }: any = await api
//       .get(`items?populate=mainPhoto`)
//       .json()
//     return data as IOriginItem[]
//   } catch (err: any) {
//     console.log(err)
//     return rejectWithValue(err)
//   }
// })

type currentOriginState = {
  chosenPhotoNumber: number
  isPhotoDetailsOpen: boolean
  currentOriginData: IOriginItem | null
}

const initialState: currentOriginState = {
  chosenPhotoNumber: 0,
  isPhotoDetailsOpen: false,
  currentOriginData: null,
}


export const currentOriginSlice = createSlice({
  name: "currentOrigin",
  initialState,
  reducers: {
    setCurrentOriginData: (state, action: PayloadAction<IOriginItem>) => {
      // state = { ...state,
      //   currentOrigin: action.payload
      // }
      state.currentOriginData = action.payload
    },
    setChosenPhotoNumber: (state, action: PayloadAction<number>) => {
      state.chosenPhotoNumber = action.payload
    },
    setNextPhotoNumber: (state, action: PayloadAction<void>) => {
      if (state.currentOriginData) {
       if (state.chosenPhotoNumber < state.currentOriginData.allPhotos.length - 1) {
        state.chosenPhotoNumber = state.chosenPhotoNumber + 1
        //  state = {
        //     ...state,
        //     chosenPhotoNumber: state.chosenPhotoNumber + 1
        //   }
        } else {
          state.chosenPhotoNumber = 0
        }
      }
    },

    
    setPrevPhotoNumber: (state, action: PayloadAction<void>) => {
      if (state.currentOriginData) {
        if (state.chosenPhotoNumber > 0) {
         state.chosenPhotoNumber = state.chosenPhotoNumber - 1
         //  state = {
         //     ...state,
         //     chosenPhotoNumber: state.chosenPhotoNumber + 1
         //   }
         } else {
           state.chosenPhotoNumber = state.currentOriginData.allPhotos.length - 1
         }
       }
    },
    setIsPhotoDetailsOpen: state => {
      state.isPhotoDetailsOpen = !state.isPhotoDetailsOpen
    },
    // setCurrentOrigin: (state, action: PayloadAction<IOriginItem>) => {
    //   state = {...state,
    //     currentOriginItem: action.payload,
    //     chosenPhotoNumber: 0,
    //   }
    // },
  },
  extraReducers: builder => {
    builder
    // .addCase(fetchItems.pending, state => {
    //   state.isLoading = true
    //   state.error = null
    // })
    // .addCase(fetchItems.fulfilled, (state, action) => {
    //   state.originItems = action.payload
    //   state.isLoading = false
    //   state.error = null
    // })
    // .addCase(fetchItems.rejected, state => {
    //   state.originItems = []
    //   state.isLoading = false
    //   state.error = "error"
    // })
  },
})

export const {
  setChosenPhotoNumber,
  setIsPhotoDetailsOpen,
  setCurrentOriginData,
  setNextPhotoNumber,
  setPrevPhotoNumber,
} = currentOriginSlice.actions

export const currentOriginReducer = currentOriginSlice.reducer
