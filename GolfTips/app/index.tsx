import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import { images } from '@/constants/images'
import { colors } from '@/constants/colors'
import LoginButton from '@/components/LoginButton'
import { useRouter } from 'expo-router'
import React from 'react'

// -- / Index - first route file under app: 
const Index = () => {
  const router = useRouter();

  return (
    <View style={styles.container} className='min-w-12 min-h-24'>
      <Image source={images.wLogo} style={styles.image} />
      <View style={styles.centerItems}>
        <LoginButton
          title='Log In'
          onPress={() => router.push('../auth/login')}>
        </LoginButton>
        <LoginButton
          title='Sign Up'
          onPress={() => router.push('../auth/signup')}>
        </LoginButton>
      </View>

    </View >
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 30,
    backgroundColor: colors.accentWhite,
  },
  image: {
    width: 125,
    height: 100,
    marginBottom: 90,
    alignSelf: "center"
  },
  centerItems: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 40
  }
})
