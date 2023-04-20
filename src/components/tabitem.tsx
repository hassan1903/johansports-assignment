import { Pressable, StyleSheet } from "react-native"
import { Text } from "react-native-paper"

type TabItemProps = {
  id: string
  title: string
  isActive: boolean
  onPress: (selected: string) => void
}

const TabItem = ({ id, title, isActive, onPress }: TabItemProps) => {
  return (
    <Pressable
      key={`tabItem_${id}`}
      style={[styles.tabItem, isActive ? styles.active : null]}
      onPress={() => onPress(id)}
    >
      <Text style={styles.description}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 2.5,
    borderBottomColor: "#3f6996"
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    paddingTop: 10
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10
  }
})

export default TabItem
