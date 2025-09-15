import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { UserProvider } from '@/context/useridcontext';
import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <View
        className="bg-secondary-100 flex flex-row justify-center items-center mt-[20px] min-h-[105px] w-[150px] overflow-hidden"
      >
        <Image
          source={icon}
          tintColor="#00695B"
          className="w-[45px] h-[45px]"
        />
        <Text className="text-primary-100 text-base font-semibold ml-2">
          {title}
        </Text>
      </View>
    );
  }
  // else
  return (
    <View className="flex gap-0 flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center overflow-hidden">
      <Image source={icon} tintColor="#3E8F72" className="w-[42px] h-[42px]" />
      <Text className="text-primary-100 text-base font-semibold ml-2">
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const res = await axios.get('localhost/getpkey');
        setPublishableKey(res.data.publishableKey);
      } catch (err) {
        console.error('Failed to fetch Stripe key:', err);
      }
    };

    fetchKey();
  }, []);

  if (!publishableKey) return null; // wait until key is loaded


  return (
    // <UserProvider>  
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            margin: 0
          },
          tabBarStyle: {
            backgroundColor: '#FFFEF1', // bottom nav color
            padding: 0,
            margin: 0,
            width: "100%",
            position: "absolute",
            overflow: "hidden",
          },
        }}
      >

        <Tabs.Screen
          name="index"
          options={{
            title: "index",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={icons.land}
                title="Home" />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={icons.explore}
                title="Explore" />

            ),
          }}
        />

        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={icons.about}
                title="About" />
            ),
          }}
        />
      </Tabs>
    </StripeProvider>
  );
}