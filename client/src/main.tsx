import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Provider } from "react-redux"
// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./state";
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "./theme"
import store from "./redux/store"
import { MetaMaskProvider } from "metamask-react"


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MetaMaskProvider>
        <App />
        </MetaMaskProvider>
    </ThemeProvider>
  </Provider>
)
