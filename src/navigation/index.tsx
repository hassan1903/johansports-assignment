import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack"
import Cities from "screens/cities"
import WeatherDetail from "screens/weatherdetail"

const Stack = createStackNavigator()
const MainNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={Cities}>
      <Stack.Screen name="Cities" component={Cities} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetail} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default MainNavigation
