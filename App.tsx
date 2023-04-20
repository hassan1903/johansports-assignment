import { Provider as PaperProvider, MD2LightTheme as DefaultTheme } from "react-native-paper"
import Main from "screens"
import { AppContextProvider } from "context/appcontext"

const App = () => {
  return (
    <PaperProvider theme={DefaultTheme}>
      <AppContextProvider>
        <Main />
      </AppContextProvider>
    </PaperProvider>
  )
}

export default App
