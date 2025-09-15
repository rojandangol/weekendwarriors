import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import axios from 'axios';

//  import NetInfo from "@react-native-community/netinfo";
// import * as Network from 'expo'
import { useUser } from '@/context/useridcontext';
import user from '../(sidebar)/access';

//need this to save user_id for saved tips: 
//global variable: https://legacy.reactjs.org/docs/context.html 
// https://react.dev/learn/passing-data-deeply-with-context
// // Cite: https://reactnative.dev/docs/dimensions
const { width: Screen_Width } = Dimensions.get('window');

const Login = () => {

    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUserId, user_id } = useUser();
    // const { user_id } = useUser(); // get user_id from context
    // need async 
    const handleLogin = async () => {


        const userinfo = {
            username,
            password,

        };
        //try & catch: https://www.geeksforgeeks.org/how-to-use-try-catch-and-finally-in-typescript/# 
        try {
            //post req because we're sending data before we receive it
            const response = await axios.post('localhost/checkuserlogin', userinfo);
            console.log('Full response:', response.data);
            if (response.data?.user_id) {
                console.log('we have a user id but is it setting it?');
                console.log('if we have it:', String(response.data.user_id));
                setUserId(String(response.data.user_id)); // 🔐 Save in Context
                // setUserId("1");
            }
            // setuser_id(response.data.userid); // ✅ store in context
            // console.log('Login successful:', response.data.username);// login message from backend
            Alert.alert(`Login successful ${response.data.user_id}`, `User ID: ${user_id}`);

            router.replace('/(tabs)'); // navigate to main tabs screen if successful login
        }
        catch (error: any) {
            console.error('Login failed:', error);

            if (error.response && error.response.data.message) {
                // if (error.response && error.response.data && error.response.data.message) {
                //for specific backend error
                Alert.alert('Login Failed', error.response.data.message);
            } else {
                // other errors
                Alert.alert('Login Failed', 'An unexpected error occurred. Please try again.');
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.thirdContainer}>
                    {/* Logo */}
                    <Image source={images.yellowLogo} style={styles.logo} resizeMode="contain" />

                    {/* Welcome Text */}
                    <Text style={styles.welcomeText}>Welcome back!</Text>

                    {/* Username Field */}
                    <View style={styles.inputField}>
                        <FontAwesome name="user-o" size={20} color="gray" />
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#999"
                            style={styles.inputText}
                            //test val:rdtest
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    {/* Password Field */}
                    <View style={styles.inputField}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            style={styles.inputText}
                            //test val:rdtest
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Feather name="eye-off" size={20} color="gray" />
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={styles.loginButtonContainer}
                        onPress={handleLogin}
                    >
                        <LinearGradient
                            colors={['#CFC88D', '#1F5C4D']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: '#00695B',
        position: 'relative',
        alignItems: 'flex-end',
    },
    innerContainer: {
        width: '80%',
        height: 50,
        marginTop: 25,
        verticalAlign: 'bottom',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C7C080',
        borderRadius: 30,
        flex: 1,
        padding: 2,
    },
    thirdContainer: {
        width: Screen_Width,
        //marginLeft: -(Screen_Width * 0.1),
        backgroundColor: '#FFFEF1',
        borderRadius: 30,
        height: '100%',
        position: 'absolute',
        bottom: -50,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 64,
        height: 64,
        marginTop: -250,
        marginBottom: 24,
        alignSelf: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#4B5563',
        marginBottom: 15,
        alignSelf: 'center',
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 9999,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    inputText: {
        marginLeft: 12,
        flex: 1,
        color: '#4B5563',
    },
    loginButtonContainer: {
        width: '100%',
        borderRadius: 9999,
    },
    loginButton: {
        paddingVertical: 12,
        borderRadius: 9999,
    },
    loginButtonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '500',
    },
});
