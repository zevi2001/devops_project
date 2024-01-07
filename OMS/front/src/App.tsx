import MyRouter from "./components/myrouter/MyRouter"
import { createTheme, ThemeProvider } from "@mui/material"
import { typographyStyle } from "./style"

const theme = createTheme({
  typography: typographyStyle
})

function App() {
  

  return (
    <>
    <ThemeProvider theme={theme}> 
    <MyRouter/>
    </ThemeProvider>
    </>
  )
}

export default App
