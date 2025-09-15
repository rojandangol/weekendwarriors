/*
import { Link, Tabs } from "expo-router"
import { View } from "react-native"
export default function TabsLayout() {
    return (
        <View className=" flex-1 h-full   bg-slate-600">
            <Link href={'/(tabs)/about'}> Click here</Link>
        </View>
    )
}*/

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  item: {
    padding: 10,
    fontSize: 18,
    paddingTop: 20,
    height: 44,
    color: "white",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

const Layout2 = () => {
  const router = useRouter();
  return (
    <View className="h-full bg-slate-950 items-center place-items-center">
      <View className="mt-5">
        <FlatList
          data={[
            {
              key: "User Profile",
              images: require("@/assets/icons/user.png"),
              page: "/(sidebar)/user",
            },
            {
              key: "Settings",
              images: require("@/assets/icons/settings.png"),
              page: "/(sidebar)/setting",
            },
            {
              key: "Customize App",
              images: require("@/assets/icons/customize.png"),
              page: "/sidebar/costume",
            },
            {
              key: "Accessibility Features",
              images: require("@/assets/icons/accesibility.png"),
              page: "/access",
            },
          ]}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  item.key == "User Profile"
                    ? router.push(`/user`)
                    : item.key == "Settings"
                    ? router.push("/setting")
                    : item.key == "Customize App"
                    ? router.push("/costume")
                    : item.key == "Accessibility Features"
                    ? router.push("./access")
                    : null
                }
              >
                <Image style={styles.image} source={item.images}></Image>
                <Text style={styles.item}>{item.key}</Text>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
};
export default Layout2;
