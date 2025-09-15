import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { UserProvider } from '@/context/useridcontext'; 


export default function SidebarLayout() {
    const backText = '< Back';
    const router = useRouter();

    return (

    // <UserProvider>
    <Stack>
      <Stack.Screen
        name="screen"
        options={{
          title: "Settings and Privacy",
          headerStyle: {
            backgroundColor: "black", 
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerTintColor: "white",
          contentStyle: { backgroundColor: "black" },
          headerLeft: () => {
            return (
                <TouchableOpacity onPress={() => router.push('..')} style={{}}>
                    <Text style={{color: 'white', fontSize: 15}}> {backText} </Text>
                </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="access"
        options={{
            title: "Settings and Privacy",
            headerStyle: {
                backgroundColor: "black",
              },
            headerTintColor: "white",
        }}
    />
    <Stack.Screen
        name="costume"
        options={{
            title: "Settings and Privacy",
            headerStyle: {
                backgroundColor: "black",
              },
            headerTintColor: "white",
        }}
    />
    <Stack.Screen
        name="setting"
        options={{
            title: "Settings and Privacy",
            headerStyle: {
                backgroundColor: "black",
              },
            headerTintColor: "white",
        }}
    />
    <Stack.Screen
        name="user"
        options={{
            title: "Settings and Privacy",
            headerStyle: {
                backgroundColor: "black",
              },
            headerTintColor: "white",
        }}
    />
    </Stack>
    // </UserProvider>
  );
}
