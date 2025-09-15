import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageSourcePropType,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { black, blueGrey900 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import axios from 'axios';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type SocialIconProps = {
  source: ImageSourcePropType;
  link: string;
};

const SocialIcon: React.FC<SocialIconProps> = ({ source, link }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(link)}>
      <Image source={source} style={styles.socialIcon} />
    </TouchableOpacity>
  );
};

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const userinfo = {
      username,
      password,
    }
    try {
      const response = await axios.post('localhost/signup', userinfo);

      console.log('Signup successful:', response.data.username);
      Alert.alert('Success', response.data.user_id); // signup message from backend
      router.replace('/(tabs)'); // navigate to main tabs screen if successful signup
    }
    catch (error: any) {
      console.error('Signup failed:', error);
      if (error.response && error.response.data.message) {
        Alert.alert('Signup Failed', error.response.data.message);
      } else {
        Alert.alert('Signup Failed', 'An unexpected error occurred.');
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.goldBackground} />
      <View style={styles.innerContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          style={{ flex: 1 }}
        >

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo */}
            <Image source={icons.logo} style={styles.logoW} resizeMode="contain" />

            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Get Started!</Text>

            {/* Username Field */}
            <View style={styles.inputField}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#999"
                style={styles.inputText}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputField}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                style={styles.inputText}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={[styles.signupButtonContainer, { opacity: username && password ? 1 : 0.5 }]} // Disable button visually if fields are empty
              onPress={username && password ? () => handleSignup() : undefined} // Disable functionality if fields are empty
            >
              <LinearGradient
                colors={['#CFC88D', '#1F5C4D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signupButton}
              >
                <Text style={styles.signupButtonText}>Sign up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.tipText}>
              Please enjoy these tips and remember,
              {'\n'}golf is just a game.
            </Text>
            <Text style={styles.funText}>Let’s have some fun with it!</Text>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or sign up with</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Icons */}
            {/* Social Icons */}
            <View style={styles.socialContainer}>
              <SocialIcon source={icons.google} link="google.com" />
              <SocialIcon source={icons.outlook} link="outlook.com"/>
              <SocialIcon source={icons.facebook} link="facebook.com"/>
              <SocialIcon source={icons.apple} link="apple.com"/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView >
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F5C4D',
    position: 'relative',
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  goldBackground: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    height: 160,
    backgroundColor: colors.secondary200,
    borderRadius: 30,
    zIndex: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 100,
    marginBottom: 0,
    marginHorizontal: 0,
    borderRadius: 30,
    padding: 20,
    justifyContent: 'center',
    zIndex: 1,
  },
  logoW: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "black",
    textAlign: 'center',
    marginBottom: 24,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  signupButtonContainer: {
    width: '100%',
    borderRadius: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  signupButton: {
    paddingVertical: 14,
    borderRadius: 30,
  },
  signupButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginTop: 16,
  },
  funText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
    marginTop: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCC',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#999',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  socialIcon: {
    width: 32,
    height: 32,
  },
});
