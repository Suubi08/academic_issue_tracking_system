import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import { ThemeProvider } from "./components/theme-provider.jsx"
import { IssueProvider } from "./context/IssueContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <IssueProvider>
          <App />
        </IssueProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

