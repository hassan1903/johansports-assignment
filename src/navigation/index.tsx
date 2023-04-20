import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Cities from "screens/cities"
import WeatherDetail from "screens/weatherdetail"

const Stack = createStackNavigator()
const MainNavigation = () => (
  <NavigationContainer theme={DefaultTheme}>
    <Stack.Navigator
      initialRouteName={Cities}
      screenOptions={{
        headerStyle: { backgroundColor: "#232529" },
        headerTitleStyle: { color: "#efefef" }
      }}
    >
      <Stack.Screen
        options={{ title: "Select city", cardStyle: { backgroundColor: "#efefef" } }}
        name="Cities"
        component={Cities}
      />
      <Stack.Screen name="WeatherDetail" component={WeatherDetail} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default MainNavigation
