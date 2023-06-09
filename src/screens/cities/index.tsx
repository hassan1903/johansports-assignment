import { Fragment, useState } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { Divider, List, Searchbar, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import CityList from "api/citylist.json"
import { i18n } from "utils"

const Cities = ({ navigation }) => {
  // Local States
  const [searchQuery, setSearchQuery] = useState("")
  const [cities, setCities] = useState(CityList)

  // Click Events
  const onChangeSearch = query => {
    setSearchQuery(query)
    if (query && query.length > 0) {
      const filteredCities = CityList.filter(el =>
        el.name.toLowerCase().includes(query.toLowerCase())
      )
      setCities(filteredCities)
    } else {
      setCities(CityList)
    }
  }

  // Render Functions
  const renderList = () => {
    return cities.map((item, ind) => {
      return (
        <Fragment key={item.id}>
          <List.Item
            onPress={() => navigation.push("WeatherDetail", { cityName: item.name })}
            title={item.name}
            description={item.country}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          {ind !== cities.length - 1 ? <Divider style={styles.divider} /> : null}
        </Fragment>
      )
    })
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>{i18n.t("OpenWeather")}</Text>
        <Text style={styles.description}>{i18n.t("OpenWeatherDesc")}</Text>
        <Searchbar
          style={styles.searchbar}
          placeholder={i18n.t("SearchCity")}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        {renderList()}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16
  },
  header: {
    fontSize: 45,
    lineHeight: 53,
    fontWeight: "700"
  },
  description: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    paddingTop: 10
  },
  searchbar: {
    marginTop: 24,
    marginBottom: 16
  },
  divider: {
    backgroundColor: "#dddddd",
    height: 1.5
  }
})

export default Cities
