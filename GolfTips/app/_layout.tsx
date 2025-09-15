import { StatusBar, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { ThemeProvider } from '@/components/ThemeContext';
import "./globals.css"
import { UserProvider } from '@/context/useridcontext'; 

// import { UserProvider } from "./context/useridcontext"; 
export default function RootLayout() {
  return <>
  <UserProvider>   
  <ThemeProvider>
    <StatusBar hidden={true} />
    <Stack initialRouteName="index">
      {/* Hide tabs folder on top nav bar */}
      
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="tips/[id]"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="(sidebar)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false
        }} />

      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }} />
    </Stack >
    </ThemeProvider>
    </UserProvider>   
  </>
}
