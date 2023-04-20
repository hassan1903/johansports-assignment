import { Fragment, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, View } from "react-native"
import { Divider, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from "expo-image"
import TabItem from "components/tabitem"
import { useAppContext } from "context/appcontext"
import { callAPI } from "api/axioshelper"
import { i18n, imagePlaceholder } from "utils"
import { unix } from "moment"

// Type Declarations
type DailyItem = {
  dt: number
  min: number
  max: number
  weather: Array<{ icon: string; description: string }>
}

type HourlyItem = {
  dt: number
  main: { feels_like: number }
  weather: Array<{ icon: string }>
}

type HourlyList = {
  list: Array<HourlyItem>
}

const WeatherDetail = ({ navigation, route }) => {
  // Constant Variables
  const { cityName } = route.params || {}
  // Local States
  const [hourlyDetails, setHourlyDetails] = useState<HourlyList>()
  const [dailyDetails, setDailyDetails] = useState<Array<DailyItem>>([])
  const [activeTab, setActiveTab] = useState("0")
  // Contexts
  const { setLoading } = useAppContext() || {}

  /**
   * Show alert when api response return a message.
   * @param responseData
   */
  const errorBoundary = useCallback(
    (errorMsg: string) => {
      // hide loading when api returns
      setLoading && setLoading(false)
      // show error if api got error
      Alert.alert(i18n.t("Error"), errorMsg, [
        { text: i18n.t("OK"), onPress: () => navigation.goBack() }
      ])
    },
    [navigation, setLoading]
  )

  // Set header title
  useLayoutEffect(() => {
    navigation.setOptions({ title: cityName })
  }, [cityName, navigation])

  useEffect(() => {
    /**
     * Get API that fetch forecast data of selected country weather.
     * @param cityName
     */
    const getForecastWeatherDetailByName = (city: string) => {
      // show loading when calling api
      setLoading && setLoading(true)
      callAPI("GET", `forecast?q=${city}&units=metric`)
        .then(async res => {
          if (res.data) {
            // set api response to local state
            setHourlyDetails(res.data)
            /* API doesn't provide daily list start */
            const dailyDataList: Array<DailyItem> = []
            let previousDay = ""
            let ind = 0
            for (let index = 0; index < res.data.list.length; index++) {
              const item = res.data.list[index]
              const timestamp = unix(item.dt)
              const day = timestamp.format("ddd, MMMM DD")
              if (dailyDataList.length === 0) {
                dailyDataList.push({ ...item, min: item.main.temp_min, max: item.main.temp_max })
                previousDay = day
              } else if (previousDay !== day) {
                dailyDataList.push({ ...item, min: item.main.temp_min, max: item.main.temp_max })
                previousDay = day
                ind += 1
              } else if (previousDay === day) {
                if (dailyDataList[ind].min > item.main.temp_min) {
                  dailyDataList[ind].min = item.main.temp_min
                } else if (dailyDataList[ind].max < item.main.temp_max) {
                  dailyDataList[ind].max = item.main.temp_max
                }
              }
            }
            /* API doesn't provide daily list end */
            setDailyDetails(dailyDataList)
            // hide loading when api returns
            setLoading && setLoading(false)
          }
        })
        .catch(err => {
          if (err.data?.message) {
            errorBoundary(err.data.message)
          } else {
            errorBoundary(err.toString())
          }
        })
    }

    getForecastWeatherDetailByName(cityName)
  }, [cityName, errorBoundary, setLoading])

  // Click Events
  const onTabItemClick = selectedTab => {
    setActiveTab(selectedTab)
  }

  // Render Functions
  const renderTabItems = () => {
    return (
      <View style={styles.tabContainer}>
        <TabItem
          id="0"
          title={i18n.t("ThreeHourForecast")}
          isActive={activeTab === "0"}
          onPress={onTabItemClick}
        />
        <TabItem
          id="1"
          title={i18n.t("FiveDayForecast")}
          isActive={activeTab === "1"}
          onPress={onTabItemClick}
        />
      </View>
    )
  }

  const renderHourlyList = () => {
    return hourlyDetails?.list?.map((item, ind) => {
      const timestamp = unix(item.dt)
      return (
        <Fragment key={item.dt}>
          <View style={styles.listitem}>
            <Text style={styles.label}>{`${timestamp.format("DD/MM")} ${timestamp.format(
              "HH:mm"
            )}`}</Text>
            <Image
              style={styles.image}
              source={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              placeholder={imagePlaceholder}
              transition={500}
            />
            <Text style={styles.label}>{`${Math.round(item.main.feels_like)}°C`}</Text>
          </View>
          {ind !== hourlyDetails.list.length - 1 ? <Divider style={styles.divider} /> : null}
        </Fragment>
      )
    })
  }

  const renderDailyList = () => {
    return dailyDetails?.map((item, ind) => {
      const timestamp = unix(item.dt)
      return (
        <Fragment key={item.dt}>
          <View style={styles.listitem}>
            <Text style={[styles.label, styles.labelMinWidth]}>{`${timestamp.format(
              "ddd, MMMM DD"
            )}`}</Text>
            <View style={styles.dailyListItem}>
              <Image
                style={styles.image}
                source={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                placeholder={imagePlaceholder}
                transition={500}
              />
              <Text style={styles.label}>{`${Math.round(item.max)} / ${Math.round(
                item.min
              )}°C`}</Text>
            </View>
            <Text style={styles.label}>{item.weather[0].description}</Text>
          </View>
          {ind !== dailyDetails.length - 1 ? <Divider style={styles.divider} /> : null}
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
        <Text style={styles.header}>{cityName}</Text>
        {/* <Text style={styles.description}>{`${i18n.t("WeekMood")}: ${"Amazing"}`}</Text> */}
        {renderTabItems()}
        {activeTab === "0" ? renderHourlyList() : renderDailyList()}
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
    padding: 16,
    marginBottom: 30
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
  tabContainer: {
    flexDirection: "row",
    paddingTop: 20
  },
  image: {
    width: 36,
    height: 36
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600"
  },
  labelMinWidth: {
    minWidth: 100
  },
  listitem: {
    flexDirection: "row",
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "space-around"
  },
  dailyListItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 48
  },
  divider: {
    backgroundColor: "#dddddd",
    height: 1.5
  }
})

export default WeatherDetail
