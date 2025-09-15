import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const user = () => {
  const [fontSize, setFontSize] = useState(false);
  const [fontType, setFontType] = useState(false);
  const [language, setLanguage] = useState(false);
  return (
    <View className="bg-zinc-950 text-slate-950 h-full">
      <View className="flex-col justify-between items-start w-full px-4 mt-2">
        <View className="flex-row items-center px-4 py-2">
          <Image
            className="w-12 h-12 ml-3 mt-3"
            source={require("@/assets/icons/customize.png")}
          />
          <View className="flex-1 ml-10">
            <Text className="text-white text-2xl font-semibold">Customize</Text>
          </View>
        </View>
        <View className="h-px bg-white w-full mb-4 mt-8" />
        <TouchableOpacity onPress={() => setFontSize(!fontSize)}>
          <Text className="text-white text-xl font-semibold text-center mt-4 ml-5">
            FontSize
          </Text>
          {fontSize && (
            <Text className="text-white text-xl mt-5">all information</Text>
          )}
        </TouchableOpacity>
        <View className="h-px bg-white w-full mb-4 mt-8" />
        <TouchableOpacity onPress={() => setFontType(!fontType)}>
          <Text className="text-white text-xl font-semibold text-center mt-4 ml-5">
            Font Type
          </Text>
          {fontType && (
            <Text className="text-white text-xl mt-5">all information</Text>
          )}
        </TouchableOpacity>
        <View className="h-px bg-white w-full mb-4 mt-8" />
        <TouchableOpacity onPress={() => setLanguage(!language)}>
          <Text className="text-white text-xl font-semibold text-center mt-4 ml-5">
            Language
          </Text>
          {language && (
            <Text className="text-white text-xl mt-5">all information</Text>
          )}
        </TouchableOpacity>
        <View className="h-px bg-white w-full mb-4 mt-8" />
      </View>
    </View>
  );
};
export default user;
