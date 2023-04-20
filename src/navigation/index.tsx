import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import Cities from "screens/cities"
import WeatherDetail from "screens/weatherdetail"
import { i18n } from "utils"

type RootStackParamList = {
  Cities: undefined
  WeatherDetail: undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const MainNavigation = () => (
  <NavigationContainer theme={DefaultTheme}>
    <Stack.Navigator
      initialRouteName="Cities"
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
      }}
    >
      <Stack.Screen
        options={{ title: i18n.t("SelectCity"), cardStyle: styles.cardStyle }}
        name="Cities"
        component={Cities}
      />
      <Stack.Screen
        options={{ cardStyle: styles.cardStyleWhite }}
        name="WeatherDetail"
        component={WeatherDetail}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#232529"
  },
  headerTitleStyle: {
    color: "#efefef"
  },
  cardStyle: {
    backgroundColor: "#efefef"
  },
  cardStyleWhite: {
    backgroundColor: "#ffffff"
  }
})

export default MainNavigation
