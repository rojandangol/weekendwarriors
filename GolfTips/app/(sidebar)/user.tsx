import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const user = () => {
  const [editButton, setEditButton] = useState(false);
  const [userName, setName] = useState("Temuulen");
  const [userPassword, setPassword] = useState("*******");
  const [gmail, setGmail] = useState("tem@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("(501)-231-4191");

  const [photo, setPhoto] = useState<string | null>(null);
  const selectFromLibrary = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets?.[0]) {
        const uri = response.assets?.[0]?.uri;
        if (uri != undefined) {
          setPhoto(uri);
        }
      }
    });
  };

  return (
    <View className="bg-zinc-950 text-slate-950 h-full">
      <View className="flex-row justify-between items-start w-full px-4 mt-2">
        <View className="flex-col">
          <Image
            className="mt-8 ml-8"
            source={require("@/assets/icons/user.png")}
          />

          <View className="flex-row">
            <View className="mt-6 ml-2">
              <TouchableOpacity
                className="bg-green-400 w-28 h-10 rounded-lg justify-center items-center"
                onPress={() => setEditButton(true)}
              >
                <Text className="text-black text-sm font-medium">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mt-6 ml-2">
              <TouchableOpacity
                className="bg-blue-300 w-20 h-10 rounded-lg justify-center items-center"
                onPress={() => setEditButton(false)}
              >
                <Text className="text-black text-sm font-medium">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mt-10 mr-8">
          {editButton ? (
            <View className="relative w-24 h-24">
              <Image
                source={require("@/assets/images/wwLogo.png")}
                className="w-24 h-24 rounded-full"
              />
              <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 justify-center items-center">
                <Text className="text-black text-lg font-bold">+</Text>
              </View>
            </View>
          ) : (
            <Image
              source={require("@/assets/images/wwLogo.png")}
              className="w-24 h-24 rounded-full"
            />
          )}
        </View>
      </View>
      <View className="h-px bg-white w-full mb-4 mt-10" />
      <Text
        className="font-bold size-14 text-white mt-4 w-full ml-6"
        style={{ fontSize: 20 }}
      >
        Login Credentials
      </Text>
      <View className="flex-col w-full mt-2 px-4 mr-6">
        <View className="h-px bg-white w-full mb-4" />
        <View className="flex-row items-center mb-2 mt-6">
          <Text className="text-white font-semibold text-xl w-1/3">
            Username:
          </Text>
          {editButton ? (
            <View className="w-auto">
              <TextInput
                value={userName}
                onChangeText={setName}
                className="w-full bg-white/10 border border-white rounded-md p-1 text-white text-xl"
                placeholder="Enter password"
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
          ) : (
            <View className="w-2/3 items-start ml-1">
              <Text className="text-white text-xl">{userName}</Text>
            </View>
          )}
        </View>

        <View className="flex-row items-center mb-8 mt-6">
          <Text className="text-white font-semibold text-xl w-1/3">
            Password:
          </Text>
          {editButton ? (
            <View className="w-auto px-4 mt-4">
              <TextInput
                value={userPassword}
                onChangeText={setPassword}
                className="w-full bg-white/10 border border-white rounded-md p-1 text-white text-xl"
                placeholder="Enter password"
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
          ) : (
            <View className="w-2/3 items-start ml-1">
              <Text className="text-white text-xl">{userPassword}</Text>
            </View>
          )}
        </View>
        <View className="h-px bg-white w-full mb-4" />
        <View className="flex-row items-center mb-2 mt-6">
          <Text className="text-white font-semibold text-xl w-1/3">Email:</Text>
          {editButton ? (
            <View className="w-auto px-4 mt-4">
              <TextInput
                value={gmail}
                onChangeText={setGmail}
                className="w-full bg-white/10 border border-white rounded-md p-1 text-white text-xl"
                placeholder="Enter password"
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
          ) : (
            <View className="w-2/3 items-start ml-1">
              <Text className="text-white text-xl">{gmail}</Text>
            </View>
          )}
        </View>
        <View className="flex-row items-center mb-8 mt-6">
          <Text className="text-white font-semibold text-xl w-1/3">
            Phone-Number:
          </Text>
          {editButton ? (
            <View className="w-auto px-4 mt-4">
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                className="w-full bg-white/10 border border-white rounded-md p-1 text-white text-xl"
                placeholder="Enter password"
                placeholderTextColor="rgba(255,255,255,0.6)"
              />
            </View>
          ) : (
            <View className="w-2/3 items-start ml-1">
              <Text className="text-white text-xl">{phoneNumber}</Text>
            </View>
          )}
        </View>
      </View>
      <View className="h-px bg-white w-full mb-4" />
    </View>
  );
};
export default user;
