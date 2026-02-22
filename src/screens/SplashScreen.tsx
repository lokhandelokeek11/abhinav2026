import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [progress, setProgress] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 100,
            duration: 2000,
            useNativeDriver: false,
        }).start();

        const timer = setTimeout(() => {
            navigation.replace('MainTabs');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const width = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>🎓</Text>
            <Text style={styles.appName}>Abhinav 2026</Text>
            <Text style={styles.tagline}>Young Professional Conference</Text>

            <View style={styles.progressContainer}>
                <Animated.View style={[styles.progressBar, { width }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 80,
        marginBottom: spacing.m,
    },
    appName: {
        ...typography.header,
        color: colors.surface,
        fontSize: 32,
        marginBottom: spacing.s,
    },
    tagline: {
        ...typography.subtitle,
        color: colors.surface,
        opacity: 0.8,
        marginBottom: spacing.xxl,
    },
    progressContainer: {
        width: '60%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: colors.surface,
    },
});
