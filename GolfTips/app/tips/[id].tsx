import { View, Text, ScrollView, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import TipBoxes from '@/components/TipBoxes';
import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Wave from "@/components/Wave";
import logoImage from "@/assets/logos/weekend-warrior-logo-green.png"
import SearchBar from "@/components/SearchBar";
import YoutubePlayer from "react-native-youtube-iframe"
import { useTheme } from '@/components/ThemeContext';
import { ThemeProvider } from '@/components/ThemeContext';


const TipsDetails = () => {
  const themeContext = useTheme();
  const theme = themeContext?.theme;  
  const router = useRouter();
  const [query, setQuery] = useState('');
  const {id} = useLocalSearchParams(); // get type from URL
  const [tips, setTips] = useState([]);
  const [searchData, setSearchData] = useState([]); // state to hold search data

  const prepSearch = async() => {
    try {
      const response = await axios.get(`http://1:3000/tipsType/${id}`);
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

  const searchKeys = ['title'];

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get(`localhost/gettipsonclick/${id}`);
        //if there is no data then return alert
        if (response.data.length === 0) {
         
          //Alert 
          Alert.alert(

            //title
            "No Tips Found :(", 
            //message         
            `Tips for "${id}", coming soon`, 
            [
              {text: "OK"}
              // { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }else{
        setTips(response.data);
        }
      } catch (error) {
        console.error('Error fetching tips:', error);
        alert("Something is wrong");
      }
    };

    fetchTips();
    prepSearch();
  }, [id]);

  return (
    <ThemeProvider>
    <View style={{ backgroundColor: theme.header }}>
      <ScrollView>
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
        <Text style={styles.headText}>{id}</Text>
        <View style={styles.wrapper} className="p-[20px]">
          <SearchBar placeholder="Search Tips..." value={query} data={searchData} searchKeys={searchKeys} onChangeText={setQuery} />
        </View>
        {tips.map((tip, index) => (
          <TipBoxes
            key={index}
            tipId={tip.tips_id} 
            title={tip.title}
            body={tip.details}
            read="Read More"
            ytlink={tip.ytlink}
            >
          </TipBoxes>
        ))}
        </View>
      </ScrollView>
    </View>
    </ThemeProvider>
  );
};

export default TipsDetails

const styles = StyleSheet.create({
    headText: {
      fontSize: 35,
      zIndex: 2,
      marginTop: '10%',
      // marginLeft: '35%',
      // position: 'absolute'
      alignSelf: 'center' , 
     
    },
    // clubImage: {
    //   marginBottom: '0%',
    //   zIndex: 1,
    //   position: 'relative'
    // },
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20
    },
})