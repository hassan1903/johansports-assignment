import { StyleSheet, View } from "react-native"
import { ActivityIndicator, DefaultTheme } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import MainNavigation from "navigation"
import { deviceWidth } from "utils"
import { useAppContext } from "context/appcontext"

const Main = () => {
  const { loading } = useAppContext() || {}
  return (
    <>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <MainNavigation />
      </SafeAreaProvider>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={styles.loading}
            animating
            color={DefaultTheme.colors.background}
          />
        </View>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    opacity: 0.5
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: deviceWidth / 2 - 12
  }
})

export default Main
