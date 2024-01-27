import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cart";
import { originsReducer } from "./slices/origins";
import { carouselReducer } from "./slices/carousel";
import { currentOriginReducer } from "./slices/currentOrigin";
import { homeReducer } from "./slices/home";
// import { tagsReducer } from "./slices/allTags";


const store = configureStore({
    reducer: {
        origins: originsReducer,
        home: homeReducer,
        cart: cartReducer,
        carousel: carouselReducer,
        currentOrigin: currentOriginReducer,
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch