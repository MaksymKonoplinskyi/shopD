import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import ky from "ky"
import { HomeItemsId, IOriginItem, IPhotoFormats } from "../../types/data"

const api = ky.create({
  prefixUrl: import.meta.env.VITE_REACT_APP_API_URL + "/api/",
})

interface ICollaborationResponse {
  success: boolean
  message?: string
}

interface ICollaborationUserData {
  name: string
  email: string
  company?: string
  comment: string
}

export const fetchCollaborationUserData = createAsyncThunk<
  boolean,
  ICollaborationUserData,
  { rejectValue: string }
>(
  "collaboration/fetchCollaborationUserData",
  async (collaborationUserData, { rejectWithValue }) => {
    try {
      const res: ICollaborationResponse = await api
        .post(`collaboration-lists`, {
          json: { data: { ...collaborationUserData } },
        })
        .json()
      return res.success
    } catch (err: any) {
      const error = err.response ? err.response.data.message : err.message
      console.log(err)
      return rejectWithValue(err)
    }
  }
)


type CollaborationState = {
  isLoading: boolean
  error: string | null
  isReceivedSuccess: boolean
}

const initialState: CollaborationState = {
  isLoading: false,
  error: null,
  isReceivedSuccess: false,
  
}

export const collaborationSlice = createSlice({
  name: "collaboration",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCollaborationUserData.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCollaborationUserData.fulfilled, (state, action) => {
        state.isReceivedSuccess = true
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchCollaborationUserData.rejected, state => {
        state.isLoading = false
        state.error = "error"
      })
  },
})


export const collaborationReducer = collaborationSlice.reducer
