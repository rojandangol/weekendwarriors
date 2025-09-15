import { View, Text, Image } from "react-native";

const user = () => {
  return (
    <View className="bg-zinc-950 text-slate-950 h-full">
      <View className="flex-col justify-between items-start w-full px-4 mt-2">
        <View className="flex-row items-center px-4 py-2">
          <Image
            className="w-12 h-12 ml-3 mt-3"
            source={require("@/assets/icons/accesibility.png")}
          />
          <View className="flex-1 ml-10">
            <Text className="text-white text-2xl font-semibold">
              Accesibility Features
            </Text>
          </View>
        </View>
        <View className="h-px bg-white w-full mb-4 mt-8" />
        <View className="flex-col">
          <Text className="text-white text-xl font-semibold text-center mt-4 ml-5">
            FontSize
          </Text>
        </View>
        <View className="h-px bg-white w-full mb-4 mt-8" />
        <View className="flex-col">
          <Text className="text-white text-xl font-semibold text-center mt-4 ml-5">
            Hearing
          </Text>
        </View>
        <View className="h-px bg-white w-full mb-4 mt-8" />
        <View className="flex-col">
          <Text className="text-white text-xl font-semibold text-center mt-4 ml-5">
            Voice Control
          </Text>
        </View>
        <View className="h-px bg-white w-full mb-4 mt-8" />
      </View>
    </View>
  );
};
export default user;
