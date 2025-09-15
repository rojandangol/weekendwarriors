import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const setting = () => {
  const [appInfo, setAppInfo] = useState(false);
  const [TroubleShoot, setTroubleShoot] = useState(false);

  return (
    <View className="bg-zinc-950 text-slate-950 h-full">
      <View className="flex-col justify-between items-start w-full px-4 mt-2">
        <View className="flex-row items-center px-4 py-2">
          <Image
            className="w-12 h-12"
            source={require("@/assets/icons/settings.png")}
          />
          <View className="flex-1 ml-10">
            <Text className="text-white text-2xl font-semibold">Settings</Text>
          </View>
        </View>
        <View className="h-px bg-white w-full mb-4 mt-8" />
        <TouchableOpacity onPress={() => setAppInfo(!appInfo)}>
          <Text className="text-white text-2xl font-semibold text-center mt-4 ml-5">
            App Store History
          </Text>
          {appInfo && (
            <Text className="text-white text-xl mt-5">all information</Text>
          )}
        </TouchableOpacity>
        <View className="h-px bg-white w-full mb-4 mt-8" />
        <TouchableOpacity
          className=""
          onPress={() => setTroubleShoot(!TroubleShoot)}
        >
          <Text className="text-white text-2xl font-semibold text-center mt-4 ml-5">
            TroubleShoot
          </Text>
          {TroubleShoot && (
            <Text className="text-white text-xl mt-5"> More Informations</Text>
          )}
        </TouchableOpacity>
        <View className="h-px bg-white w-full mb-4 mt-8" />
      </View>
    </View>
  );
};
export default setting;
