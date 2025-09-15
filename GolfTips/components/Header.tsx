import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '@/constants/icons';
import { colors } from '@/constants/colors';
import Search from './Search';

const Header = () => {
    const [flexDirection, setFlexDirection] = useState('row');

    return (
        <View style={styles.header}>
            {/* Left section: Hamburger Menu - Side Navigation Bar  */}
            <View style={styles.logoContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="menu" size={30} color={colors.secondary} />
                </TouchableOpacity>
            </View>

            {/* Middle section: Logo/Brand */}
            <View style={styles.titleContainer}>
                <Image
                    source={icons.goldLogo}
                    style={{
                        width: 80,
                        height: 35,
                    }}
                />
            </View>

            {/* Right section: Search or action buttons */}
            <View style={styles.actionsContainer}>
                <Search />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', // Align children in a row (horizontal)
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.primary,
        marginVertical: 20,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    logoText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    titleContainer: {
        flex: 2,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
    },
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        tintColor: colors.secondary,
    },
    iconButton: {
        marginLeft: 10,
        fontSize: 55,
    },
});

export default Header;
