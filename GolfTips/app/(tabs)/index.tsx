import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Wave from "@/components/Wave";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import { useTheme } from "@/components/ThemeContext";
import TipCategories from "@/components/TipCategories";
import BookmarkSaveIcon from "@/components/BookmarkSaveIcon";
import TipBoxes from "@/components/TipBoxes";
import { useUser } from "@/context/useridcontext";
import { clubs } from "@/constants/clubs";
import { useFocusEffect } from '@react-navigation/native';


export default function Index() {
  const router = useRouter();
  const { user_id } = useUser();
  const { theme, toggleTheme } = useTheme();

  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [savedTips, setSavedTips] = useState([]);

const prepSearch = async() => {
    try {
      const response = await axios.get(`localhost/allTips`);
      if(response.data.length === 0) {
        alert("No tips found");
      }else{
        setSearchData(response.data);
      }

    }catch (error) {
      console.error('Error fetching tips:', error);
      alert("Something is wrong");
    };
  }

  const searchKeys = ['title', 'type'];

  useEffect(() => {
    prepSearch();
  }, []);




  //To retreive all the saved tips
  //This automatically refresh the saved tips using reacts library
  useFocusEffect(
  useCallback(() => {
    const fetchSavedTips = async () => {
      try {
        const response = await axios.get(`localhost/retriveSavedTips/${user_id}`);
        if (response.data.length > 0) {
          setSavedTips(response.data);
        } else {
          Alert.alert(
            "No Saved Tips",
            "You do not have any saved tips. Go save some tips!",
            [{ text: "OK" }]

          );
        }
      } catch (error) {
        console.error("Error fetching saved tips:", error);
        console.log("User ID:", user_id);
      }
    };

    fetchSavedTips();
  }, [user_id])
);
const handleRemove = (save_id: number) => {
  Alert.alert(
    "Confirm Remove",
    "Are you sure you want to remove this saved tip?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        onPress: async () => {
          try {
            await axios.delete(`localhost/removeSavedTips/${save_id}`);
            Alert.alert("Removed", "Tip removed successfully");
            // Refresh the saved tips list
            const res = await axios.get(`localhost/retriveSavedTips/${user_id}`);
            setSavedTips(res.data);
          } catch (err) {
            console.error("Delete error:", err);
            Alert.alert("Error", "Could not remove saved tip");
          }
        }
      }
    ]
  );
};


  return (
    <View style={{ backgroundColor: theme.header, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableOpacity onPress={() => router.push("/(sidebar)/screen")}>
          <Text style={{ fontSize: 55, paddingLeft: 18, color: theme.sidebar }}>
            ≡
          </Text>
        </TouchableOpacity>

        <Image
          source={theme.logoimage}
          style={{
            width: 230,
            height: 100,
            alignSelf: "center",
          }}
        />

       <View style={styles.wrapper} className="p-[20px]">
          <SearchBar placeholder="Search Tips..." value={query} data={searchData} searchKeys={searchKeys} onChangeText={setQuery} />
        </View>


        <View style={styles.tipCard}>
          <Text className="text-black text-xl font-bold p-5">Tip of the Day:</Text>
          <Text className="text-black text-xl underline">Full Swing: Practice Swing Divots</Text>
          <Text className="text-black text-xl p-5">
            Does your practice swing feel better than your regular swing? This
            is a fairly common feeling, but not incurable...
          </Text>
          <Text className="text-blue-500 text-xl italic text-right p-5">
            Read more...
          </Text>
        </View>

        <Wave color="#fff" style={{ height: 100 }} />

        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <Switch
            value={theme === 'DarkTheme'}
            onValueChange={toggleTheme}
            thumbColor={theme === 'DarkTheme' ? '#fff' : '#000'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        <View style={{ backgroundColor: theme.background, paddingBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: theme.text }}>Saved Tips</Text>
            {/* <TouchableOpacity onPress={() => router.push("/(tips)/savedtips")} style={{ marginLeft: "auto" }}>
              <Text style={{ fontSize: 16, color: "#00695B" }}>View All →</Text>
            </TouchableOpacity> */}
          </View>

          <View>
            {savedTips.map((tip, index) => (
              <TipBoxes
                key={index}
                tips_id={tip.tips_id}
                title={tip.title}
                body={tip.details}
                read="Read More"
                ytlink={tip.ytlink}
                save_id={tip.save_id}
                onRemove={handleRemove}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  tipCard: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    alignSelf: "center",
    marginVertical: 20,
    padding: 10,
  },
});
