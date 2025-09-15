import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import BookmarkSaveIcon from "@/components/BookmarkSaveIcon";
import axios from 'axios';
import { Alert } from 'react-native';

//getting userid from context
import { useUser } from '@/context/useridcontext';

//Youtube player from: https://www.npmjs.com/package/react-native-youtube-iframe 
import YoutubePlayer from "react-native-youtube-iframe"


const TipBoxes = (props: any) => {
  //set is as false at first
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const { user_id } = useUser();

  const handleSavetips = async () => {
    console.log("Saving tip:", props.tipId); // ✅ Debug
    console.log("With user_id:", user_id);
    try {
      const res = await axios.post('localhost/saveTips', {
        user_id,
        tips_id: props.tipId,
      });
      Alert.alert('Saved!', res.data.message || 'Tip saved successfully');
    } catch (error) {
      console.error('Save failed:', error);
      Alert.alert('Save Failed', 'Could not save tip.');
    }
  };



  // Function to extract YouTube video ID from URL
  const getYoutubeVideoId = (url: string | undefined) => {
    if (!url) return null;

    if (url.length === 11) {
      // Raw video ID
      return url;
    }

    // Updated regex to also capture /shorts/ URLs
    const regex = /(?:\?v=|\/embed\/|\.be\/|\/shorts\/)([^&\n?#]+)/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  const videoId = getYoutubeVideoId(props.ytlink);

  return (
    <View style={styles.view}>
      <View
        style={{
          marginLeft: 8,
          alignSelf: 'flex-end',
          justifyContent: 'flex-end',
          position: 'relative', // Make sure positioning works
          bottom: '5%', // Adjust this value as needed
          zIndex: 1
        }}
      >

        <TouchableOpacity
          onPress={handleSavetips}
          style={styles.bookmarkButton}
          activeOpacity={0.7}
        >
          <BookmarkSaveIcon
            size={54}
            backgroundColor="#F0E5C3"
            iconColor="#00695B"
            strokeColor="#00695B" />


        </TouchableOpacity>

      </View>

      {videoId ? (
        <View style={styles.youtubeContainer}>
          <YoutubePlayer
            height={200}
            play={false}
            videoId={videoId}
          />
        </View>
      ) : null}
      <Text style={styles.title}>{props.title}</Text>

      <Text style={styles.body}>
        {/* if expanded, only show 120 character, then show all of them */}
        {expanded ? props.body : props.body.slice(0, 120) + (props.body.length > 120 ? '...' : '')}
      </Text>

      {/* when you press on it, it de-expands, and then shows Show Less. */}
      {props.body.length > 120 && (
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.read}>

            {/* condition ? doIfTrue : doIfFalse */}
            {expanded ? "Show Less" : props.read}
          </Text>
        </TouchableOpacity>
      )}

      {/* Remove button */}
      <TouchableOpacity onPress={() => props.onRemove(props.save_id)} style={{ position: 'absolute', top: 10, left: 10 }}>
        <Text style={{ color: 'red' }}>🗑 Remove</Text>
      </TouchableOpacity>
    </View>
  )
};

export default TipBoxes;

const styles = StyleSheet.create({
  view: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
    marginBottom: '5%',
    padding: '5%',
    borderRadius: 20,
    boxShadow: '10px 10px 5px 2px #918566',
    backgroundColor: '#e6dcc2',
  },
  youtubeContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    fontSize: 15,

  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  read: {
    fontSize: 15,
    color: '#0066CC', // Make the "Read More" look clickable
    marginTop: 8,
    fontWeight: 'bold'
  },

});