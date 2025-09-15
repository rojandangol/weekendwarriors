import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import Homescreen from "./app/screens/Homescreen"
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import React from 'react'
import Index from './app/(tabs)';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

const App = () => {

  // let [fontsLoaded] = useFonts({
  //     Inter_900Black,
  // });

  // if (!fontsLoaded) {
  //     return null;
  // }

  const [appIsReady, setAppIsReady] = useState(false);  // state to track splash screen + font loading 

  useEffect(() => {
    async function prepare() {
      try { // Pre-load fonts, API calls
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000000)); // Artificially delay for two seconds to simulate a slow loading experience
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) { // hide splash screen after `appIsReady` + Root View is displayed
      SplashScreen.hideAsync();
    }
  }, [appIsReady]); // load/display app

  if (!appIsReady) {
    return null;
  }
  return (
    <View
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    onLayout={onLayoutRootView}>
    <Text>SplashScreen Demo! 👋</Text>
    <Text>HELLLOOOOOO</Text>
    <Entypo name="rocket" size={30} />
  </View>
  )
}

export default App;

const styles = StyleSheet.create({})