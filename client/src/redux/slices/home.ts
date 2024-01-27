import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import ky from "ky"
import { HomeItemsId, IOriginItem, IPhotoFormats } from "../../types/data"

const api = ky.create({
  prefixUrl: import.meta.env.VITE_REACT_APP_API_URL + "/api/",
})

// const addAllPhotos = (item:IOriginItem) => {

//   const mainPhotoF: IPhotoFormats = {
//     ...item.attributes.mainPhoto.data.attributes.formats,
//     origin: item.attributes.mainPhoto.data.attributes
//   }

//   const interiorPhotoF: IPhotoFormats = {
//     ...item.attributes.interiorPhoto.data.attributes.formats,
//     origin: item.attributes.interiorPhoto.data.attributes
//   }

//   const photosFA: IPhotoFormats[] = item.attributes.photos.data.map(
//     (arg:any) => {
//       return {...arg.attributes.formats, origin: arg.attributes}
//     }
//   )
//   const allPhotos: IPhotoFormats[] = [
//     mainPhotoF,
//     interiorPhotoF,
//     ...photosFA,
//   ]
//   return { ...item, allPhotos }
// }

export const fetchHomeItems = createAsyncThunk<
  HomeItemsId,
  void,
  { rejectValue: string }
>("home/fetchHomeItems", async (_, { rejectWithValue }) => {
  try {
    const res: any = await api.get(`originals-in-home?populate=*`).json()
    const resData = res.data.attributes //as HomeItems
    const HomeItemsId: any = {
      firstOfAbstract: null,
      secondOfAbstract: null,
      firstOfNude: null,
      secondOfNude: null,
      firstOfOthers: null,
      secondOfOthers: null,
    }
    for (const key in resData) {
      if (Object.prototype.hasOwnProperty.call(resData, key)) {
        const element = resData[key]

        if (typeof element === "object") {
          HomeItemsId[key] = Number(element.data.id)
        }
      }
    }
    return HomeItemsId as HomeItemsId
  } catch (err: any) {
    console.log(err)
    return rejectWithValue(err)
  }
})

interface SubscriptionResponse {
  success: boolean
  message?: string
}

export const fetchSubscribeEmail = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>("home/fetchSubscribeEmail", async (email, { rejectWithValue }) => {
  try {
    const res: SubscriptionResponse = await api
      .post(`subscribers-emails-lists`, { json: { data: { email: email } } })
      .json()
    return res.success
  } catch (err: any) {
    const error = err.response ? err.response.data.message : err.message
    console.log(err)
    return rejectWithValue(err)
  }
})

interface aboutHomeInfo {
  title: string
  text: string
  photoUrl: string
}

export const fetchAboutHomeInfo = createAsyncThunk<
aboutHomeInfo,
  void,
  { rejectValue: string }
>("home/fetchAboutHomeInfo", async (_, { rejectWithValue }) => {
  try {
    const res: any = await api.get(`about-home-info?populate=*`).json()
    const resData = res.data.attributes //as HomeItems
    const aboutHomeInfo: aboutHomeInfo = {
      title: resData.title,
      text: resData.text,
      photoUrl: resData.photo.data.attributes.formats.medium.url,
    }

    return aboutHomeInfo as aboutHomeInfo
  } catch (err: any) {
    console.log(err)
    return rejectWithValue(err)
  }
})


interface collaborationHomeInfo {
  title: string
  text: string
  photoUrl: string
}

export const fetchCollaborationHomeInfo = createAsyncThunk<
  collaborationHomeInfo,
  void,
  { rejectValue: string }
>("home/fetchCollaborationHomeInfo", async (_, { rejectWithValue }) => {
  try {
    const res: any = await api.get(`collaboration-home-info?populate=*`).json()
    const resData = res.data.attributes //as HomeItems
    const collaborationHomeInfo: collaborationHomeInfo = {
      title: resData.title,
      text: resData.text,
      photoUrl: resData.photo.data.attributes.formats.medium.url,
    }

    return collaborationHomeInfo as collaborationHomeInfo
  } catch (err: any) {
    console.log(err)
    return rejectWithValue(err)
  }
})

type HomeState = {
  homeItemsId: HomeItemsId | null
  isLoading: boolean
  error: string | null
  userIsSubscribeEmail: boolean
  isSubscribing: boolean
  collaborationHomeInfo: collaborationHomeInfo
  aboutHomeInfo: aboutHomeInfo
}

const initialState: HomeState = {
  homeItemsId: null,
  isLoading: false,
  error: null,
  userIsSubscribeEmail: false,
  isSubscribing: false,
  collaborationHomeInfo: {
    title: "",
    text: "",
    photoUrl: "",
  },
  aboutHomeInfo: {
    title: "",
    text: "",
    photoUrl: "",
  },
}

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // setItems: (state, action: PayloadAction<IOriginItem[]>) => {
    //   state.originItems = action.payload
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHomeItems.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchHomeItems.fulfilled, (state, action) => {
        state.homeItemsId = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchHomeItems.rejected, state => {
        // state.originItems = []
        state.isLoading = false
        state.error = "error"
      })

      .addCase(fetchSubscribeEmail.pending, state => {
        state.isSubscribing = true
        state.error = null
      })
      .addCase(fetchSubscribeEmail.fulfilled, (state, action) => {
        state.userIsSubscribeEmail = action.payload
        state.isSubscribing = false
        state.error = null
      })
      .addCase(fetchSubscribeEmail.rejected, state => {
        // state.originItems = []
        state.isSubscribing = false
        state.error = "error"
      })

      .addCase(fetchAboutHomeInfo.pending, state => {
        // state.isSubscribing = true
        state.error = null
      })
      .addCase(fetchAboutHomeInfo.fulfilled, (state, action) => {
        state.aboutHomeInfo = action.payload
        // state.isLoading = false
        state.error = null
      })
      .addCase(fetchAboutHomeInfo.rejected, state => {
        // state.originItems = []
        // state.isSubscribing = false
        state.error = "error"
      })
      .addCase(fetchCollaborationHomeInfo.pending, state => {
        // state.isSubscribing = true
        state.error = null
      })
      .addCase(fetchCollaborationHomeInfo.fulfilled, (state, action) => {
        state.collaborationHomeInfo = action.payload
        // state.isLoading = false
        state.error = null
      })
      .addCase(fetchCollaborationHomeInfo.rejected, state => {
        // state.originItems = []
        // state.isSubscribing = false
        state.error = "error"
      })
  },
})

// export const { setItems } = originsSlice.actions

export const homeReducer = homeSlice.reducer
