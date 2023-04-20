import { createContext, useContext, useState } from "react"

type AppContextType = {
  loading: boolean
  setLoading: (isShow: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null)
const useAppContext = () => {
  return useContext(AppContext)
}
const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return <AppContext.Provider value={{ loading, setLoading }}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider, useAppContext }
