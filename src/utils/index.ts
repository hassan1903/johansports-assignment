// Imports
import AsyncStorage from "@react-native-async-storage/async-storage"
import { I18n } from "i18n-js"
import { Dimensions, Platform } from "react-native"
import en from "translations/en.json"

//Exports
export const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window")
export const isAndroid = Platform.OS === "android"
export const isIOS = Platform.OS === "ios"
export const imagePlaceholder =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
export const i18n = new I18n({
  en
})

/**
 * Save item to async storage
 * @param key
 * @param value
 */
export const asyncStorageSetItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value)
  } catch (e) {
    // saving error
  }
}

/**
 * Remove item from async storage
 * @param key
 */
export const asyncStorageRemoveItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`@${key}`)
  } catch (e) {
    // remove error
  }
}

/**
 * Get item from async storage
 * @param key
 * @returns
 */
export const asyncStorageGetItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`)
    return value
  } catch (e) {
    return null
    // error reading value
  }
}
