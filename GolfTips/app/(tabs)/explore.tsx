import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, {useEffect, useState} from "react";
import TipCategories from "@/components/TipCategories";
import { clubs } from "@/constants/clubs";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import Wave from "@/components/Wave";
import SearchBar from "@/components/SearchBar";
import logoImage from "@/assets/logos/weekend-warrior-logo-green.png"
import { useTheme } from '@/components/ThemeContext';
import { ThemeProvider } from '@/components/ThemeContext';
import axios from "axios";

const explore = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState([]); // state to hold search data
  const componentsData = [
    { title: "Address Position", club: clubs.addresspositionclub },
    { title: "Bunker Play", club: clubs.bunkersclub },
    { title: "Chipping", club: clubs.chippingclub },
    { title: "Cold Weather", club: clubs.coldweatherclub },
    { title: "Driver", club: clubs.driversclub },
    { title: "Equipment", club: clubs.equipmentclub },
    { title: "Fairway Woods and Hybrids", club: clubs.fairwoodclub },
    { title: "Full Swing", club: clubs.fullswingclub },
    { title: "Game Management", club: clubs.gamemanagementclub },
    { title: "Putting", club: clubs.puttingclub },
    { title: "Trouble Shots", club: clubs.troubleshotclub },
    { title: "Irons", club: clubs.ironsclub },
  ];
  const searchKeys = ['title','type'];

  const prepSearch = async() => {
    try {
      const response = await axios.get(`http://localhost/allTips`);
      if(response.data.length === 0) {
        alert("No tips found");
      }else{
        setSearchData(response.data);
      }
    }
    catch (error) {
      console.error('Error fetching tips:', error);
      alert("Something is wrong");
    };
  }

  useEffect(() => {
    prepSearch();
  }, []);


  return (
    <View style={{ backgroundColor: theme.header }}>
    <ScrollView>
      <View style = {{flex:1, backgroundColor: theme.header}} className="position: relative overflow-auto">
      <TouchableOpacity onPress={() => router.push("/(sidebar)/screen")}>
        <Text
          style={{
            fontSize: 55,
            paddingLeft: 18,
            paddingTop: 12,
            color: theme.sidebar,
          }}
        >
          ≡
        </Text>
      </TouchableOpacity>
       <Image
            source={theme.logoimage}
            style={{
              width: 230,
              height: 100,
              marginBottom: 0,
              alignSelf: "center", // Centers the image horizontally
            }}
          />
      <Wave
        style={{
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          
        }}
        color="#fff"
      />

      <View style = {{backgroundColor: theme.background}}>
        <Text style={{ fontSize: 40, alignSelf: "center", marginTop: 40, color: "#80724e" }}>
          Explore Tips
        </Text>
        <ThemeProvider>
        <View style={styles.wrapper} className="p-[20px]">
          <SearchBar placeholder="Search Tips..." value={query} data={searchData} searchKeys={searchKeys} onChangeText={setQuery} />
        </View>
        {/* maps all titles together and cycles through to post to app */}
        {componentsData.map((data, index) => (
          <TipCategories key={index} {...data}/>
        ))}
        </ThemeProvider>
      </View>
      </View>
  </ScrollView>
  </View>
  );
};
export default explore;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
});


